package com.ssafy.god_life.personal.service;

import com.ssafy.god_life.fund.entity.FundInfo;
import com.ssafy.god_life.fund.repository.FundInfoRepository;
import com.ssafy.god_life.global.fintech.dto.response.CreateDepositAccountResponseDto;
import com.ssafy.god_life.global.fintech.dto.response.DeleteAccountResponseDto;
import com.ssafy.god_life.global.fintech.dto.response.InquireDepositInfoDetailResponseDto;
import com.ssafy.god_life.global.fintech.service.FintechService;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.exception.MemberNotFoundException;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.personal.domain.Personal;
import com.ssafy.god_life.personal.dto.request.PersonalMissionRequestDto;
import com.ssafy.god_life.personal.dto.response.*;
import com.ssafy.god_life.personal.exception.PersonalNotFoundException;
import com.ssafy.god_life.personal.history.domain.PersonalRuleHistory;
import com.ssafy.god_life.personal.history.repository.PersonalRuleHistoryRepository;
import com.ssafy.god_life.personal.history.service.PersonalRuleHistoryService;
import com.ssafy.god_life.personal.repository.PersonalRepository;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class PersonalServiceImpl implements PersonalService {

    private final PersonalRuleHistoryService personalRuleHistoryService;

    private final MemberRepository memberRepository;
    private final PersonalRepository personalRepository;
    private final PersonalRuleHistoryRepository personalRuleHistoryRepository;

    private final FundInfoRepository fundInfoRepository;

    private final FintechService fintechService;

    @Override
    public Personal findById(Long id) {
        return personalRepository.findById(id)
                .orElseThrow(() -> new PersonalNotFoundException("해당 ID의 미션이 없습니다."));
    }

    @Override
    public PersonalMissionResponseDto getDetailByMemberId(Long memberId) {
        Member findMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("해당 ID의 멤버가 존재하지 않습니다."));
        Personal findPersonal = findMember.getPersonal();
        float successRate = personalRuleHistoryService.calculatePersonalIsCompleted(findPersonal.getId());
        Boolean isCompleted = personalRuleHistoryRepository.isCompletedTodayByPersonalId(findPersonal.getId());
        return new PersonalMissionResponseDto(findMember, findPersonal, successRate, isCompleted==null || isCompleted);
    }

    @Override
    public Long save(Personal personal, Long memberId) {
        personalRepository.save(personal);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("해당 Id에 해당하는 멤버가 없습니다"));
        member.makePersonal(personal);

        personalRuleHistoryRepository.save(PersonalRuleHistory.builder()
                .personal(personal)
                .build());
        return personal.getId();
    }

    @Override
    public PersonalDetailInfoResponseDto findPersonalDetailInfoByMemberId(Long memberId) {
        Long personalId = memberRepository.findPersonalIdById(memberId);
        Personal personal = personalRepository.findById(personalId).orElseThrow(()-> new RuntimeException("개인 미션을 조회할 수 없습니다."));
//        PersonalDetailInfoResponseDto personalDetailInfoResponseDto = new PersonalDetailInfoResponseDto(personal);
        LocalDateTime now = LocalDateTime.now();
        int days = (int)ChronoUnit.DAYS.between(personal.getCreatedDate(), now)-personalRuleHistoryRepository.countByPersonalIdAndCreatedDateAndNow(personalId, personal.getCreatedDate(), now)+1;
        BigDecimal bd = new BigDecimal(Float.toString((0.3f)*(days/30)));
        bd = bd.setScale(1, RoundingMode.HALF_UP);
        PersonalDetailInfoResponseDto personalDetailInfoResponseDto = PersonalDetailInfoResponseDto.builder()
                .currentRate(personal.getInterestRate() + bd.floatValue())
                .createdDate(personal.getCreatedDate())
                .expiredDate(personal.getExpiredDate())
                .days(days)
                .build();

        return personalDetailInfoResponseDto;
    }

//    @Override
//    public List<PersonalBoardResponseDto> findPersonalBoardDtoByMemberId(Long memberId) {
//        Long personalId = memberRepository.findPersonalIdById(memberId);
//        Personal personal = personalRepository.findById(personalId).orElseThrow(null);
//
//        List<RulePersonalHistory> rulePersonalHistoryList = rulePersonalHistoryRepository.findAllByPersonalId(personalId);
//
//        List<PersonalBoardResponseDto> personalBoardResponseDtoList = new ArrayList<>();
//        for(int i = 0; i<rulePersonalHistoryList.size(); i++) {
//            PersonalBoardResponseDto personalBoardResponseDto = new PersonalBoardResponseDto(rulePersonalHistoryList.get(i));
//            personalBoardResponseDtoList.add(personalBoardResponseDto);
//        }
//        return personalBoardResponseDtoList;
//    }

    @Override
    public PersonalBoardInfoResponseDto getBoardInfoByMemberId(Long memberId, int year, int month) {
        Long personalId = memberRepository.findPersonalIdById(memberId);

        List<PersonalRuleHistory> personalRuleHistoryList = personalRuleHistoryRepository.findByPersonalIdAndYearAndMonth(personalId, year, month);

        List<PersonalBoardResponseDto> personalBoardResponseDtoList = personalRuleHistoryList.stream()
                .map(PersonalBoardResponseDto::new)
                .collect(Collectors.toList());

        float successRate = personalRuleHistoryService.calculatePersonalIsCompletedByYearAndMonth(personalId, year, month);

        return PersonalBoardInfoResponseDto.builder()
                .successRate(successRate)
                .year(year)
                .month(month)
                .dayList(personalBoardResponseDtoList)
                .build();
    }

    @Override
    public boolean isCompletedToday(Long id) {
        log.info("personalId = {}", id);
        Boolean completedToday = personalRuleHistoryRepository.isCompletedTodayByPersonalId(id);
        return completedToday == null || completedToday;
    }

    @Transactional
    @Override
    public void createPersonalMission(Long memberId, PersonalMissionRequestDto personalMissionRequestDto) {
        Member member = memberRepository.findById(memberId).orElseThrow();
        FundInfo fundInfo = fundInfoRepository.findById(1L).orElseThrow(()->new RuntimeException("FundInfo 데이터가 없습니다. 데이터 베이스를 확인하세요"));

        CreateDepositAccountResponseDto createDepositAccountResponseDto = fintechService.createDepositAccount(member.getId(), (long) personalMissionRequestDto.getMoney(), personalMissionRequestDto.getBankCode(), 0);

        Personal personal = new Personal();

        if (fundInfo != null) {
            personal = Personal.builder()
                    .rule(personalMissionRequestDto.getRule())
                    .period(fundInfo.getPeriod())
                    .interestRate(fundInfo.getInterestRate())
                    .primeRate(fundInfo.getMonthPrimeRate())
                    .expiredDate(LocalDateTime.now().plusYears(1))
                    .money(personalMissionRequestDto.getMoney())
                    .depositAccountNo(createDepositAccountResponseDto.getREC().getAccountNo())
                    .build();
        }

        if (fundInfo == null) {
            personal = Personal.builder()
                    .rule(personalMissionRequestDto.getRule())
                    .period(1)
                    .interestRate(3)
                    .primeRate(0.3f)
                    .expiredDate(LocalDateTime.now().plusYears(1))
                    .money(personalMissionRequestDto.getMoney())
                    .depositAccountNo(createDepositAccountResponseDto.getREC().getAccountNo())
                    .build();
        }

        personalRepository.save(personal);
        member.makePersonal(personal);

        personalRuleHistoryRepository.save(PersonalRuleHistory.builder()
                .personal(personal)
                .build());

//        fintechService.updateDemandDepositAccount(member.getUserKey(), member.getMainAccountNo());
//        System.out.println("member.getUserKey() : " + member.getUserKey());
//        System.out.println("member.getMainAccountNo() : " + member.getMainAccountNo());
    }

    @Override
    public CalendarInfoResponseDto getCalendarInfoByMemberId(Long memberId, int year, int month) {

        Long personalId = memberRepository.findPersonalIdById(memberId);

        List<PersonalRuleHistory> personalRuleHistoryList = personalRuleHistoryRepository.findByPersonalIdAndYearAndMonth(personalId, year, month);

        List<PersonalDayResponseDto> personalDayResponseDtoList = personalRuleHistoryList.stream()
                .map(personalRuleHistory -> new PersonalDayResponseDto(personalRuleHistory.getCreatedDate().getDayOfMonth(),
                        personalRuleHistory.isCompleted()))
                .collect(Collectors.toList());

        float successRate = personalRuleHistoryService.calculatePersonalIsCompletedByYearAndMonth(personalId, year, month);

        return CalendarInfoResponseDto.builder()
                .successRate(successRate)
                .dayList(personalDayResponseDtoList)
                .build();
    }

    // 예금 계좌 해지 및 이체()
    @Override
    public CreateDepositAccountResponseDto deleteAccountByMemberId(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 존재하지 않습니다."));
        Personal personal = member.getPersonal();

        InquireDepositInfoDetailResponseDto inquireDepositInfoDetailResponseDto = fintechService.depositInfoDetail(member.getId(), personal.getDepositAccountNo());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String dateString = inquireDepositInfoDetailResponseDto.getREC().getAccountCreateDate();
        LocalDate date = LocalDate.parse(dateString, formatter);
        LocalDate today = LocalDate.now();

        int daysBetween = (int) ChronoUnit.DAYS.between(date, today);

        DeleteAccountResponseDto deleteAccountResponseDto = fintechService.deleteAccount(member.getId(), personal.getDepositAccountNo());


        long money = deleteAccountResponseDto.getREC().getDepositBalance();
        if (money >= 100000000) {
            money = 100000000;
        }
        CreateDepositAccountResponseDto createDepositAccountResponseDto = fintechService.createDepositAccount(member.getId(), money, "090", daysBetween / 30);

        //기존 예금 계좌 기록 삭제
        personalRuleHistoryRepository.deleteAllByPersonalId(personal.getId());
        //멤버에서 personal 연관관계 제거
        member.deletePersonal();
        //기존 예금 계좌를 보상 지급 계좌로 업데이트
        personal.delete((float) createDepositAccountResponseDto.getREC().getInterestRate());

        return createDepositAccountResponseDto;
    }

    @Override
    public void setTime(Long memberId, SetTimeRequestDto setTimeRequestDto) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("해당 Id에 해당하는 멤버가 없습니다"));
        Personal personal = member.getPersonal();
        personal.saveTime(setTimeRequestDto);
    }

    @Override
    public void deleteById(Long id) {
        personalRuleHistoryRepository.deleteAllByPersonalId(id);
        personalRepository.deleteById(id);
    }
}

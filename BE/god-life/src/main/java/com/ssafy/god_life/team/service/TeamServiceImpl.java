package com.ssafy.god_life.team.service;

import com.ssafy.god_life.global.fintech.dto.response.*;
import com.ssafy.god_life.global.fintech.service.FintechService;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.exception.MemberNotFoundException;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.team.betting.domain.Betting;
import com.ssafy.god_life.team.betting.repository.BettingRepository;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.dto.request.AdjustmentRequestDto;
import com.ssafy.god_life.team.dto.request.CreateTeamRequestDto;
import com.ssafy.god_life.team.dto.response.*;
import com.ssafy.god_life.team.history.domain.TeamRuleHistory;
import com.ssafy.god_life.team.history.dto.response.HistoryImageResponseDto;
import com.ssafy.god_life.team.history.repository.TeamRuleHistoryRepository;
import com.ssafy.god_life.team.history.service.TeamRuleHistoryService;
import com.ssafy.god_life.team.member.domain.TeamMember;
import com.ssafy.god_life.team.member.dto.response.TeamInfoResponseDto;
import com.ssafy.god_life.team.member.repository.TeamMemberRepository;
import com.ssafy.god_life.team.member.service.TeamMemberService;
import com.ssafy.god_life.team.repository.TeamRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class TeamServiceImpl implements TeamService {

    private final TeamMemberService teamMemberService;
    private final TeamMemberRepository teamMemberRepository;
    private final TeamRuleHistoryService teamRuleHistoryService;

    private final MemberRepository memberRepository;
    private final TeamRepository teamRepository;
    private final BettingRepository bettingRepository;
    private final TeamRuleHistoryRepository teamRuleHistoryRepository;
    private final FintechService fintechService;

    @Override
    public CreateTeamResponseDto save(Long memberId, CreateTeamRequestDto createTeamRequestDto) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 없습니다"));

        // 계좌 생성
        String accountNo = fintechService.createMemberDemandDepositAccount(memberId, "999-1-8fb5103dacad4b");

        Team team = Team.builder()
                .title(createTeamRequestDto.getTitle())
                .fine(createTeamRequestDto.getFine())
                .rule(createTeamRequestDto.getRule())
                .expiredDate(LocalDateTime.now().plusMonths(createTeamRequestDto.getPeriod()))
                .accountNo(accountNo)
                .memberId(memberId)
                .build();
        teamRepository.save(team);

        //팀에 멤버 추가, 당일 기록 추가
        teamMemberService.save(team.getId(), member.getId());

        return CreateTeamResponseDto.builder()
                .id(team.getId())
                .build();
    }

    @Override
    public TeamResponseDto get(Long id, Long memberId) {
        //1. 팀 정보 조회
        Team team = teamRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 팀이 없습니다"));
        String rule = team.getRule();
        //2. 방별 멤버 정보에서 설정 시간 및 잔여 벌금, 프로필 이미지 조회
        TeamInfoResponseDto teamInfo = teamMemberService.getTeamInfo(id, memberId);
        //3. 팀 규칙 달성기록에서 멤버의 미션 달성 여부 조회
        boolean isCompletedToday = teamRuleHistoryService.isCompletedToday(id, memberId);
        //4. 멤버에서 장소 조회
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 없습니다"));
        //5. 잔액 조회
        Long gatheredFine = fintechService.inquireDemandDepositAccountBalance(team.getMemberId(), team.getAccountNo()).getREC().getAccountBalance();

        if (teamInfo.isTimeSet()) {
            LocalTime time = teamInfo.getSelectedTime();
            String meridiem = "오전";
            if (time.getHour() >= 12) {
                time = time.minusHours(12);
                meridiem = "오후";
            }
            return TeamResponseDto.builder()
                    .memberList(teamInfo.getMemberList())
                    .title(team.getTitle())
                    .accountBank("싸피")
                    .accountNumber(team.getAccountNo())
                    .gatheredFine(gatheredFine)
                    .delayedFine(teamInfo.getDelayedFine())
                    .rule(rule)
                    .isTimeSet(teamInfo.isTimeSet())
                    .meridiem(meridiem)
                    .time(time)
                    .locationName(member.getHomeName())
                    .lat(member.getLatitudeSetting())
                    .lng(member.getLongitudeSetting())
                    .isCompleted(isCompletedToday)
                    .isBettingOpen(team.getIsBettingOpen())
                    .build();
        }

        return TeamResponseDto.builder()
                .memberList(teamInfo.getMemberList())
                .title(team.getTitle())
                .accountBank("싸피")
                .accountNumber(team.getAccountNo())
                .delayedFine(teamInfo.getDelayedFine())
                .gatheredFine(gatheredFine)
                .rule(rule)
                .isTimeSet(teamInfo.isTimeSet())
                .locationName(member.getHomeName())
                .lat(member.getLatitudeSetting())
                .lng(member.getLongitudeSetting())
                .isCompleted(isCompletedToday)
                .isBettingOpen(team.getIsBettingOpen())
                .build();
    }

    @Override
    public void addAllTeamHistory() {
        //1. 모든 팀 멤버 조회
        //2. 팀 기록에 리스트 넘겨 생성 요청 보내기
        //3. 팀 기록에서 받은 멤비 ID 리스트로 규칙 기록들 생성하기
        teamRuleHistoryService.addAllTodayHistory(teamMemberRepository.findAll());
    }


    // 계좌 이체(벌금 수금)
    @Override
    public UpdateDemandDepositAccountTransferResponseDto demandDepositAccountTransfer(Long id, Long memberId, Long money) {
        Team team = teamRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 팀이 없습니다"));
        String teamAccountNo = team.getAccountNo();

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));

        UpdateDemandDepositAccountTransferResponseDto updateDemandDepositAccountTransferResponseDto = fintechService.updateDemandDepositAccountTransfer(memberId, teamAccountNo, member.getMainAccountNo(), money, "벌금 입금", "벌금 출금");
        TeamMember teamMember = teamMemberRepository.findByTeamIdAndMemberId(id, memberId)
                .orElseThrow(() -> new RuntimeException("id에 해당하는 팀멤버가 없습니다"));
        teamMember.addPrefixFine(money);

        Long originMoney = money;

        if(teamMember.getDelayedFine()<money){
            money = teamMember.getDelayedFine();
        }

        teamMember.subDelayedFine(money);

        List<TeamRuleHistory> historyList = teamRuleHistoryRepository.findByTeamIdAmdMemberIdAndChargedNot(id, memberId);
        for (TeamRuleHistory teamRuleHistory : historyList) {
            if (teamRuleHistory.getCharged() <= originMoney) {
                originMoney = originMoney - teamRuleHistory.getCharged();
                teamRuleHistory.charge(originMoney);
            } else {
                originMoney = teamRuleHistory.getCharged() - originMoney;
                teamRuleHistory.charge(originMoney);
                break;
            }
        }
//        teamMemberRepository.updateFines(id, memberId, money);

        return updateDemandDepositAccountTransferResponseDto;
    }

    // 벌금통장 내역 확인
    @Override
    public TransactionListResponseDto inquireTransactionHistory(Long id) {
        Team team = teamRepository.findById(id).orElseThrow(() -> new RuntimeException("Team을 찾을 수 없습니다."));
        String teamAccountNo = team.getAccountNo();

        InquireTransactionHistoryListResponseDto inquireTransactionHistoryListResponseDto = fintechService.inquireTransactionHistoryListByTeamId(team.getId(), teamAccountNo, "A", "DESC");

        List<TransactionHistoryListResponseDto> Dto = inquireTransactionHistoryListResponseDto.getREC().getList();

        List<TransactionFinesResponseDto> list = new ArrayList<>();

        for (TransactionHistoryListResponseDto REC : Dto) {
//            Member member = memberRepository.findMemberByAccountNo(REC.getTransactionAccountNo()).orElseThrow(() -> new RuntimeException("Member를 찾을 수 없습니다."));
            Member member = memberRepository.findMemberByAccountNo(REC.getTransactionAccountNo()).orElse(null);
            if(member==null){
                continue;
            }
            TransactionFinesResponseDto transactionFinesResponseDto = TransactionFinesResponseDto.builder()
                    .memberProfileImage(member.getProfileImageURL())
                    .memberName(member.getNickname())
                    .depositType(REC.getTransactionSummary())
                    .chargedBy(team.getRule())
                    .deposit(REC.getTransactionBalance())
                    .balance(REC.getTransactionAfterBalance())
                    .fineDate(REC.getTransactionDate())
                    .build();
            list.add(transactionFinesResponseDto);
        }

        TransactionListResponseDto transactionListResponseDto = TransactionListResponseDto.builder()
                .roomName(team.getTitle())
                .fines(list)
                .build();

        return transactionListResponseDto;
    }


    @Override
    public AdjustmentResponseDto getAdjustment(Long id, Long memberId) {
        //1. 팀의 계좌 정보 조회
        Team team = teamRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 팀이 없습니다"));
        // 2 . 팀 멤버 정보 조회 (TeamMemberRepository 사용)
        List<TeamMember> adjustMembers = teamMemberRepository.findByTeamId(id);

        // 3.모든 prefixFine 값의 합을 계산합니다.
        Long totalPrefixFine = adjustMembers.stream()
                .mapToLong(TeamMember::getPrefixFine)
                .sum();

        //4. 각 멤버의 정보를 memberList로 변환합니다.
        List<AdjustmentMemberResponseDto> memberList = adjustMembers.stream()
                .map(adjustMember -> {
                    double memberRateFine = Math.round(((double) adjustMember.getPrefixFine() / totalPrefixFine) * 1000) / 10.0;
                    return AdjustmentMemberResponseDto.builder()
                            .name(adjustMember.getMember().getNickname())
                            .memberProfileImage(adjustMember.getMember().getProfileImageURL())
                            .totalFinePercent(memberRateFine)
                            .totalFine(adjustMember.getPrefixFine())
                            .build();
                })
                .toList();
        // 5. 수시입출금 계좌 잔액 조회
        InquireDemandDepositAccountBalanceResponseDto balanceResponse = fintechService.inquireDemandDepositAccountBalance(team.getMemberId(), team.getAccountNo());

        long fineGathered = balanceResponse.getREC().getAccountBalance(); // 예시로 3000000L을 사용
        // 6. 은행 이름 가져오기
        String bankCode = balanceResponse.getREC().getBankCode();
        String accountBank;
        switch (bankCode) {
            case "090":
                accountBank = "카카오뱅크";
                break;
            case "999":
                accountBank = "싸피은행";
                break;
            default:
                accountBank = "기타"; // 해당하는 은행 코드가 없는 경우
                break;
        }

        // 7. 받는 금액 가져오기
        int memberCount = memberList.size(); // 멤버 리스트의 크기(멤버 수)를 구함
        long refundAmount = memberCount > 0 ? fineGathered / memberCount : 0; // 멤버가 있을 경우 나눗셈, 없으면 0
        //8. 이 api 요청자의 정보 가져오기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 없습니다"));
        //8. 이 api 리더의 정보 가져오기
        Member leadermember = memberRepository.findById(team.getMemberId())
                .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 없습니다"));


        return AdjustmentResponseDto.builder().
                memberList(memberList)
                .memberName(member.getNickname())
                .teamName(team.getTitle())
                .accountBank(accountBank)
                .fineGathered(fineGathered)
                .refundAmount(refundAmount)
                .leaderName(leadermember.getNickname())
                .build();

    }

    // 이체 전 계좌 정보 표시
    @Override
    public MyDemandDepositAccountInfoResponseDto transferAccountInfo(Long memberId, Long teamId) {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        InquireDemandDepositAccountBalanceResponseDto inquireDemandDepositAccountBalanceResponseDto = fintechService.inquireDemandDepositAccountBalance(memberId, member.getMainAccountNo());

        Team team = teamRepository.findById(teamId).orElse(null);

        MyDemandDepositAccountInfoResponseDto myDemandDepositAccountInfoResponseDto = MyDemandDepositAccountInfoResponseDto.builder()
                .accountBalance(inquireDemandDepositAccountBalanceResponseDto.getREC().getAccountBalance())
                .accountName("내 계좌")
                .withdrawalAccountBankName(team.getTitle())
                .withdrawalAccountNo(team.getAccountNo())
                .build();
        return myDemandDepositAccountInfoResponseDto;
    }

    @Override
    public void postAdjustment(Long memberId, AdjustmentRequestDto adjustmentRequestDto) {
        //1. 팀의 계좌 정보 조회
        Team team = teamRepository.findById(adjustmentRequestDto.getTeamId()).orElseThrow(() -> new RuntimeException("id에 해당하는 팀이 없습니다"));
        String accountNo = team.getAccountNo();
        //2. 팀의 멤버 조회
        List<TeamMember> adjustMembers = teamMemberRepository.findByTeamId(adjustmentRequestDto.getTeamId());
        //3. 각 멤버에게 정산할 금액 계산
        int memberCount = adjustMembers.size();
        Long firstMemberId = team.getMemberId();
        InquireDemandDepositAccountBalanceResponseDto balanceResponse = fintechService.inquireDemandDepositAccountBalance(firstMemberId, accountNo);
        Long fineGathered = balanceResponse.getREC().getAccountBalance();
        Long refundAmount = memberCount > 0 ? fineGathered / memberCount : 0;
        //4. 각 멤버에게 정산
        if(fineGathered != 0) {
            for (int i = 0; i < memberCount; i++) {
                String memberAccountNO = adjustMembers.get(i).getMember().getMainAccountNo();
                String depositTransactionSummary = team.getTitle() + ": " + refundAmount + "원 정산";
                fintechService.updateDemandDepositAccountTransfer(firstMemberId, memberAccountNO, accountNo, refundAmount, depositTransactionSummary, "");
            }
        }
        //5. 팀계좌 삭제
        fintechService.deleteDemandDepositAccount(firstMemberId, accountNo, adjustMembers.get(0).getMember().getMainAccountNo());

        //6. 팀관련 테이블 삭제
        bettingRepository.deleteByTeamId(team.getId());
        teamMemberRepository.deleteByTeamId(adjustmentRequestDto.getTeamId());
        teamRuleHistoryRepository.deleteByTeamId(adjustmentRequestDto.getTeamId());
        teamRepository.deleteById(adjustmentRequestDto.getTeamId());

    }

    @Override
    public TeamPersonalTransactionResponseDto transactionHistoryListByMemberIdAndTeamId(Long memberId, Long teamId) {

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("id에 해당하는 팀이 없습니다"));
//        InquireTransactionHistoryListResponseDto inquireTransactionHistoryList = fintechService.inquireTransactionHistoryList(memberId, member.getMainAccountNo(), "A", "DESC");
/*        InquireTransactionHistoryListResponseDto inquireTransactionHistoryList = fintechService.inquireTransactionHistoryListByTeamId(teamId, team.getAccountNo(), "M", "DESC");

//        String teamAccount = team.getAccountNo();
        String memberAccount = member.getMainAccountNo();

        List<TeamPersonalTransactionListResponseDto> transactionHistoryList = new ArrayList<>();
        List<TransactionHistoryListResponseDto> dtoList = inquireTransactionHistoryList.getREC().getList();

//        for (TransactionHistoryListResponseDto dto : dtoList) {
//            if (dto.getTransactionAccountNo().equals(memberAccount)) {
//                TransactionHistoryResponseDto transactionHistory = fintechService.transactionHistory(team.getMemberId(), team.getAccountNo(), String.valueOf(dto.getTransactionUniqueNo()));
//                TeamPersonalTransactionListResponseDto teamPersonalTransactionListResponseDto = TeamPersonalTransactionListResponseDto.builder()
//                        .transactionDate(dto.getTransactionDate())
//                        .rule(team.getRule())
//                        .fine(transactionHistory.getREC().getTransactionBalance())
//                        .prefixFine(transactionHistory.getREC().getTransactionAfterBalance())
//                        .charged(0L)
//                        .build();
//                transactionHistoryList.add(teamPersonalTransactionListResponseDto);
//            }
//        }


        for (TransactionHistoryListResponseDto dto : dtoList) {
            if (dto.getTransactionAccountNo().equals(memberAccount)) {
                TransactionHistoryResponseDto transactionHistory = fintechService.transactionHistory(team.getMemberId(), team.getAccountNo(), String.valueOf(dto.getTransactionUniqueNo()));

                TeamPersonalTransactionListResponseDto teamPersonalTransactionListResponseDto = TeamPersonalTransactionListResponseDto.builder()
                        .transactionDate(dto.getTransactionDate())
                        .rule(team.getRule())
                        .fine(transactionHistory.getREC().getTransactionBalance())
                        .prefixFine(transactionHistory.getREC().getTransactionAfterBalance())
                        .charged(0L)
                        .build();
                transactionHistoryList.add(teamPersonalTransactionListResponseDto);
            }
        }
*/
        List<TeamPersonalTransactionListResponseDto> transactionHistoryList = new ArrayList<>();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        List<TeamRuleHistory> historyList = teamRuleHistoryRepository.findByTeamIdAmdMemberIdAndChargedNotASC(teamId, memberId);

        Long prefixFine = 0L;

        for (TeamRuleHistory ruleHistory : historyList) {
            Long charge = 0L;
            if(ruleHistory.getCharged()!=null){
                charge=ruleHistory.getCharged();
            }
            prefixFine = prefixFine + charge;

            TeamPersonalTransactionListResponseDto teamPersonalTransactionListResponseDto = TeamPersonalTransactionListResponseDto.builder()
                    .transactionDate(ruleHistory.getCreatedDate().format(formatter))
                    .rule(team.getRule())
                    .fine(team.getFine()-ruleHistory.getCharged())
                    .prefixFine(prefixFine)
                    .charged(charge)
                    .build();
            transactionHistoryList.add(teamPersonalTransactionListResponseDto);
        }
        transactionHistoryList.sort(Comparator.comparing(TeamPersonalTransactionListResponseDto::getTransactionDate).reversed());


        TeamPersonalTransactionResponseDto teamPersonalTransactionResponseDto = TeamPersonalTransactionResponseDto.builder()
                .profileImage(member.getProfileImageURL())
                .list(transactionHistoryList)
                .build();

        return teamPersonalTransactionResponseDto;
    }

    @Override
    public TeamBoardInfoResponseDto getBoardInfoByIdAndMemberId(Long id, Long memberId, int year, int month) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 없습니다"));

        List<HistoryImageResponseDto> imageListTodayByTeamId = teamRuleHistoryService.getImageListTodayByTeamId(id);
        List<TeamBoardResponseDto> teamBoardResponseDtoList = imageListTodayByTeamId.stream()
                .map(historyImageResponseDto -> TeamBoardResponseDto.builder()
                        .day(historyImageResponseDto.getDay())
                        .picture(historyImageResponseDto.getPicture())
                        .memberName(historyImageResponseDto.getMemberNickname())
                        .build()).toList();

        float successRate = teamRuleHistoryService.calculateTeamIsCompletedByYearAndMonth(id, memberId, year, month);

        return TeamBoardInfoResponseDto.builder()
                .successRate(successRate)
                .year(year)
                .month(month)
                .dayList(teamBoardResponseDtoList)
                .build();
    }

    @Override
    public TeamCalendarInfoResponseDto getTeamCalendarInfoByIdAndMemberId(Long id, Long memberId, int year, int month) {

        // 팀의 멤버별 해당 월의 기록들을 가져옵니다.
        List<TeamRuleHistory> teamRuleHistoryList = teamRuleHistoryRepository.findByteamIdandmemberIdAndYearAndMonth(id, memberId, year, month);

        List<TeamDayResponseDto> teamDayResponseDtoList = teamRuleHistoryList.stream()
                .map(teamRuleHistory -> new TeamDayResponseDto(teamRuleHistory.getCreatedDate().getDayOfMonth(),
                        teamRuleHistory.isCompleted()))
                .collect(Collectors.toList());

        float successRate = teamRuleHistoryService.calculateTeamIsCompletedByYearAndMonth(id, memberId, year, month);

        return TeamCalendarInfoResponseDto.builder()
                .successRate(successRate)
                .dayList(teamDayResponseDtoList)
                .build();
    }

    @Override
    public void makeBetting(Long id) {

        Team team = teamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ID에 해당하는 팀이 없습니다."));

        List<TeamMember> maxPrefixFineByTeamId = teamMemberRepository.findMaxPrefixFineByTeamId(id);
        Random random = new Random();
        Member targetMember = maxPrefixFineByTeamId.get(random.nextInt(maxPrefixFineByTeamId.size())).getMember();
        log.info("팀 = {}, 베팅 대상자 = {}", team.getTitle(), targetMember.getNickname());
        team.makeBetting(targetMember.getId());
    }

    public boolean isPossibleMakeBetting(Long id) {
        //1. 팀의 계좌 정보 조회
        Team team = teamRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 팀이 없습니다"));
        String accountNo = team.getAccountNo();
        //2. 팀의 멤버 조회
        List<TeamMember> Members = teamMemberRepository.findByTeamId(id);
        //3. 베팅이 가능한가?
        log.info("베팅 가능 여부 확인");
        InquireDemandDepositAccountBalanceResponseDto balanceResponse = fintechService.inquireDemandDepositAccountBalance(team.getMemberId(), accountNo);
        Long bettingMoney = Members.size() * 1000L;
        Long totalAmount = balanceResponse.getREC().getAccountBalance();
//        return bettingMoney <= totalAmount && !team.getIsBettingOpenMonth();
        log.info("베팅 가능 여부: {}", bettingMoney <= totalAmount);
        return bettingMoney <= totalAmount;
    }

    @Override
    public BettingInfoResponseDto getBettingInfo(Long id) {
        Team team = teamRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 팀이 없습니다"));
        Long targetId = team.getTargetId();
        Member targetMember = memberRepository.findById(targetId)
                .orElseThrow(() -> new MemberNotFoundException("ID에 해당하는 멤버가 없습니다"));
        return BettingInfoResponseDto.builder()
                .targetId(targetMember.getId())
                .targetName(targetMember.getNickname())
                .targetProfileImage(targetMember.getProfileImageURL())
                .rule(team.getRule())
                .prize(1000L)
                .build();
    }

    @Override
    public void resultBet() {
        //1. 모든 teamid로 isBettingOpen 의 true 여부 확인
        List<Team> teamList = teamRepository.findAll();
        for (Team team : teamList) {
            if (team.getIsBettingOpen()) {
                Long targetId = team.getTargetId();
                // targetId와 오늘 날짜에서 하루 전의 기록을 조회
//                TeamRuleHistory target = teamRuleHistoryRepository.findByTeamIdAmdMemberIdAndCreatedDate(team.getId(), targetId, LocalDate.now().minusDays(1));
                TeamRuleHistory target = teamRuleHistoryRepository.findByTeamIdAmdMemberIdAndCreatedDate(team.getId(), targetId, LocalDate.now());

                //2. 각 팀에 대한 베팅 정보를 가져와서 처리
                List<Betting> bettingList = bettingRepository.findByTeamId(team.getId());
//                if (!bettingList.isEmpty()&&(bettingList.get(0).getCreatedDate().toLocalDate().equals(LocalDate.now().minusDays(2)))) {
                if (!bettingList.isEmpty() && (bettingList.get(0).getCreatedDate().toLocalDate().equals(LocalDate.now()))) {
                    for (Betting betting : bettingList) {
                        if (betting.getId().equals(targetId)) continue;
                        if (betting.isBetSuccess() == target.isCompleted()) {
                            // 베팅 성공 처리
                            String memberAccountNO = betting.getMember().getMainAccountNo();
                            String depositTransactionSummary = betting.getMember().getNickname() + " 베팅 성공!!";
                            fintechService.updateDemandDepositAccountTransfer(
                                    team.getMemberId(), memberAccountNO, team.getAccountNo(), 1000L, depositTransactionSummary, ""
                            );
                            log.info(depositTransactionSummary);
                        }
                    }
                }
                // 베팅 기록 삭제
                deleteBet(team.getId());
            }
        }
    }

    private void deleteBet(Long id) {
        //1. 베팅기록 삭제
        bettingRepository.deleteByTeamId(id);
        //2. 팀에서 베팅 false로 수정
        Team team = teamRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 팀이 없습니다"));

        team.closeBetting();
    }
}

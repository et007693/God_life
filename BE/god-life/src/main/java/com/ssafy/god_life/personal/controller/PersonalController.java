package com.ssafy.god_life.personal.controller;

import com.ssafy.god_life.global.dto.CommonResponseDto;
import com.ssafy.god_life.global.dto.LoginMember;
import com.ssafy.god_life.global.fintech.dto.response.CreateDepositAccountResponseDto;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.personal.domain.Personal;
import com.ssafy.god_life.personal.dto.request.PersonalMissionRequestDto;
import com.ssafy.god_life.personal.dto.response.CalendarInfoResponseDto;
import com.ssafy.god_life.personal.history.service.PersonalRuleHistoryService;
import com.ssafy.god_life.personal.repository.PersonalRepository;
import com.ssafy.god_life.personal.service.PersonalService;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class PersonalController {

    private final PersonalService personalService;
    private final PersonalRepository personalRepository;
    private final MemberRepository memberRepository;
    private final PersonalRuleHistoryService personalRuleHistoryService;

    @GetMapping("/personal")
    public ResponseEntity<?> getPersonalMission(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(personalService.getDetailByMemberId(loginMember.getId()))
                .message("개인 미션 조회에 성공하였습니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/personal/create")
    public ResponseEntity<?> createPersonalMission(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember, @RequestBody PersonalMissionRequestDto personalMissionRequestDto) {
        personalService.createPersonalMission(loginMember.getId(), personalMissionRequestDto);
        Personal personal = personalRepository.findById(memberRepository.findPersonalIdById(loginMember.getId())).orElseThrow();
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(personal)
                .message("개인 미션 생성에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/personal/account")
    public ResponseEntity<?> getPersonalDeatilInfo(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(personalService.findPersonalDetailInfoByMemberId(loginMember.getId()))
                .message("계좌 상세 내역 조회에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/personal/board")
    public ResponseEntity<?> getPersonalBoard(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember, @RequestParam int year, @RequestParam int month) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(personalService.getBoardInfoByMemberId(loginMember.getId(), year, month))
                .message("개인 미션 게시판 조회에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/personal/calendar")
    public ResponseEntity<?> getPersonalCalendar(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                                 @RequestParam int year,
                                                 @RequestParam int month) {
        CalendarInfoResponseDto calendarInfoResponseDto = personalService.getCalendarInfoByMemberId(loginMember.getId(), year, month);
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(calendarInfoResponseDto)
                .message("캘린더 조회에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/personal/mission")
    public ResponseEntity<?> createBoardImage(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                              @RequestPart MultipartFile picture) throws IOException {
        personalRuleHistoryService.completeMission(picture, loginMember.getId());
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(null)
                .message("기록 저장에 성공하였습니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/personal/deposit")
    public ResponseEntity<?> deleteDeposit(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember) {
        CreateDepositAccountResponseDto createDepositAccountResponseDto = personalService.deleteAccountByMemberId(loginMember.getId());
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(createDepositAccountResponseDto)
                .message("계좌 해지에 성공하였습니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/personal/time")
    public ResponseEntity<?> setTime(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                     @RequestBody SetTimeRequestDto setTimeRequestDto) {

        personalService.setTime(loginMember.getId(), setTimeRequestDto);
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(null)
                .message("시간등록에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

}

package com.ssafy.god_life.team.controller;

import com.ssafy.god_life.global.dto.CommonResponseDto;
import com.ssafy.god_life.global.dto.LoginMember;
import com.ssafy.god_life.global.fintech.dto.response.TeamPersonalTransactionResponseDto;
import com.ssafy.god_life.team.betting.service.BettingService;
import com.ssafy.god_life.team.dto.request.*;
import com.ssafy.god_life.team.dto.response.BettingInfoResponseDto;
import com.ssafy.god_life.team.dto.response.TeamCalendarInfoResponseDto;
import com.ssafy.god_life.team.history.service.TeamRuleHistoryService;
import com.ssafy.god_life.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class TeamController {

    private final TeamService teamService;
    private final TeamRuleHistoryService teamRuleHistoryService;
    private final BettingService bettingService;

    @PostMapping("/group")
    public ResponseEntity<?> createTeam(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                        @RequestBody CreateTeamRequestDto createTeamRequestDto) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(teamService.save(loginMember.getId(), createTeamRequestDto))
                .message("팀 생성에 성공했습니다")
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/{teamId}")
    public ResponseEntity<?> getTeam(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                     @PathVariable("teamId") Long teamId) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(teamService.get(teamId, loginMember.getId()))
                .message("팀 조회에 성공했습니다")
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/adjustment/{teamId}")
    public ResponseEntity<?> getAdjustment(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                           @PathVariable("teamId") Long teamId) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(teamService.getAdjustment(teamId, loginMember.getId()))
                .message("팀 정산하기 정보를 조회합니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/group/transfer")
    public ResponseEntity<?> accountTransfer(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember, @RequestBody AccountTransferRequestDto accountTransferRequestDto) {

        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(teamService.demandDepositAccountTransfer(accountTransferRequestDto.getTeamId(), loginMember.getId(), accountTransferRequestDto.getMoney()))
                .message("계좌 이체에 성공하였습니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/transaction/{teamId}")
    public ResponseEntity<?> getTransactionHistory(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember, @PathVariable("teamId") Long teamId) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(teamService.inquireTransactionHistory(teamId))
                .message("계좌 목록 조회에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/balance/{teamId}")
    public ResponseEntity<?> getBalance(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember, @PathVariable("teamId") Long teamId) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(teamService.transferAccountInfo(loginMember.getId(), teamId))
                .message("계좌 정보 조회에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/group/{teamId}/mission")
    public ResponseEntity<?> createBoardImage(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                              @PathVariable("teamId") Long teamId,
                                              @RequestPart MultipartFile picture) throws IOException {
        teamRuleHistoryService.completeMission(picture, teamId, loginMember.getId());
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(null)
                .message("기록 저장에 성공하였습니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/group/adjust")
    public ResponseEntity<?> postAdjustment(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                            @RequestBody AdjustmentRequestDto adjustmentRequestDto) {
        // 정산 실행
        teamService.postAdjustment(loginMember.getId(), adjustmentRequestDto);

        // 응답 DTO 생성
        CommonResponseDto<Void> response = CommonResponseDto.<Void>builder()
                .data(null)
                .message("정산에 성공했습니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/personal/transaction/{teamId}")
    public ResponseEntity<?> getTeamPersonalTransaction(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                                        @PathVariable("teamId") Long teamId) {
        // 개인 이체 조회
        TeamPersonalTransactionResponseDto transactionList = teamService.transactionHistoryListByMemberIdAndTeamId(loginMember.getId(), teamId);
        // 응답 DTO 생성
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(transactionList)
                .message("개인 이체기록 조회에 성공하였습니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/{teamId}/board")
    public ResponseEntity<?> getBoardInfo(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                          @PathVariable("teamId") Long teamId,
                                          @RequestParam int year,
                                          @RequestParam int month) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(teamService.getBoardInfoByIdAndMemberId(teamId, loginMember.getId(), year, month))
                .message("팀 게시판 조회에 성공했습니다.")
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/{teamId}/calendar")
    public ResponseEntity<?> getTeamCalendar(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                                 @PathVariable("teamId") Long teamId,
                                                 @RequestParam int year,
                                                 @RequestParam int month) {
        TeamCalendarInfoResponseDto teamCalendarInfoResponseDto = teamService.getTeamCalendarInfoByIdAndMemberId(teamId, loginMember.getId(), year, month);
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(teamCalendarInfoResponseDto)
                .message("캘린더 조회에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/group/{teamId}/betting")
    public ResponseEntity<?> getBettingInfo(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                         @PathVariable("teamId") Long id) {
        BettingInfoResponseDto responseDto = teamService.getBettingInfo(id);
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(responseDto)
                .message("베팅 조회에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/group/{teamId}/betting")
    public ResponseEntity<?> openBetting(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                         @PathVariable("teamId") Long id) {
        teamService.makeBetting(id);
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(null)
                .message("베팅 생성에 성공하였습니다.")
                .build();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/group/{teamId}/betting")
    public ResponseEntity<?> betting(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                     @PathVariable("teamId") Long id,
                                     @RequestBody BettingRequestDto requestDto) {
        bettingService.bet(loginMember.getId(), id , requestDto.isBetSuccess());
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(null)
                .message("베팅에 성공했습니다.")
                .build();
        return ResponseEntity.ok(response);
    }


}

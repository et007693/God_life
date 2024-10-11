package com.ssafy.god_life.team.service;


import com.ssafy.god_life.global.fintech.dto.response.MyDemandDepositAccountInfoResponseDto;
import com.ssafy.god_life.global.fintech.dto.response.TeamPersonalTransactionResponseDto;
import com.ssafy.god_life.global.fintech.dto.response.UpdateDemandDepositAccountTransferResponseDto;
import com.ssafy.god_life.team.dto.request.AdjustmentRequestDto;
import com.ssafy.god_life.team.dto.request.CreateTeamRequestDto;
import com.ssafy.god_life.team.dto.response.*;

public interface TeamService {

    /**
     * 팀을 생성한다.
     *
     * @param memberId 팀을 만든 멤버 ID
     * @param createTeamRequestDto 팀 생성 요청 DTO
     * @return 팀 생성 응답 DTO
     */
    CreateTeamResponseDto save(Long memberId, CreateTeamRequestDto createTeamRequestDto);

    /**
     * 팀 정보를 조회한다.
     *
     * @param id 팀 ID
     * @return 팀 정보 DTO
     */
    TeamResponseDto get(Long id, Long memberId);

    /**
     * 매일 팀에 있는 모든 멤버의 규칙 기록을 생성한다.
     *
     */
    void addAllTeamHistory();

    /**
     * 계좌 이체한다.
     *
     * @param id 팀 ID
     * @param memberId 보내는 멤버의 id
     * @param money 보낼 돈
     *
     * @return 계좌 이체 DTO
     */
    UpdateDemandDepositAccountTransferResponseDto demandDepositAccountTransfer(Long id, Long memberId, Long money);

    /**
     * 벌금통장 이체내역 확인하기
     *
     * @param id 팀의 id
     */
    TransactionListResponseDto inquireTransactionHistory(Long id);

    /**
     * 팀의 정산하기 정보를 조회한다.
     *
     * @param id 팀의 id
     *
     */
    AdjustmentResponseDto getAdjustment(Long id, Long memberId);

    /**
     * 이체할 정보를 표시한다.
     *
     * @param memberId 보내는 유저 id
     * @param teamId 보낼 팀 id
     */
    MyDemandDepositAccountInfoResponseDto transferAccountInfo(Long memberId, Long teamId);
    /**
     * 정산 실행
     *
     * @param  adjustmentRequestDto 팀 id를 넣은 DTO
     * @param memberId 멤버아이디
     */
    void postAdjustment(Long memberId, AdjustmentRequestDto adjustmentRequestDto);

    /**
     * Member ID를 통해 team에 출금된 돈을 확인한다.
     *
     * @param memberId 출금한 멤버 아이디
     * @param teamId 입금한 팀 아이디
     *
     * @return TeamPersonalTransactionResponseDto의 리스트
     */
    TeamPersonalTransactionResponseDto transactionHistoryListByMemberIdAndTeamId(Long memberId, Long teamId);

    /**
     * 팀 멤버의 게시판 정보를 조회한다
     *
     * @param id 팀 ID
     * @param memberId 멤버 ID
     * @param year 연도
     * @param month 월
     * @return 게시판 응답 DTO
     */
    TeamBoardInfoResponseDto getBoardInfoByIdAndMemberId(Long id, Long memberId, int year, int month);

    /**
     * 팀 멤버의 캘린더 정보를 조회한다
     *
     * @param id 팀 ID
     * @param memberId 멤버 ID
     * @param year 연도
     * @param month 월
     * @return 캘린더 응답 DTO
     */
    TeamCalendarInfoResponseDto getTeamCalendarInfoByIdAndMemberId(Long id, Long memberId, int year, int month);

    /**
     * 방장이 베팅을 생성한다
     *
     * @param id 팀 ID
     */
    void makeBetting(Long id);

    /**
     * 베팅 생성 가능 여부를 검증한다
     *
     * @param id 팀 ID
     * @return true: 생성가능, false: 생성 불가능
     */
    boolean isPossibleMakeBetting(Long id);

    /**
     * 베팅 정보를 불러온다
     *
     * @param id 팀 ID
     * @return 베팅 정보 응답 DTO
     */
    BettingInfoResponseDto getBettingInfo(Long id);

    /**
     *  팀베팅의 결과에 따른 정상을 한다.
     *
     */
    void resultBet();



}


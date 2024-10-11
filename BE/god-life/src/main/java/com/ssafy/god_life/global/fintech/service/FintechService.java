package com.ssafy.god_life.global.fintech.service;

import com.ssafy.god_life.global.fintech.dto.response.*;

public interface FintechService {

//    /**
//     * 사용자의 userKey를 생성한다.
//     *
//     * @param id 생성할 Member의 id
//     */
//    void createUserKey(Long id);

    /**
     * 사용자의 userKey를 생성하고 반환한다.
     *
     * @param email 생성할 Member의 email 정보
     * @return Member의 유저 키
     */
    String createUserKey(String email);

    /**
     * apiKey와 사용자의 userKey를 사용하여 유저의 계좌를 생성한다.
     *
     * @param id 생성할 Member의 id 정보
     * @param accountTypeUniqueNo  생성할 계좌의 타입번호 (개인)999-1-680d0037d8ec42/(벌금통장)999-1-8fb5103dacad4b
     * @return Member의 계좌
     */
    String createMemberDemandDepositAccount(Long id, String accountTypeUniqueNo);

    /**
     * 사용자의 userKey를 조회하고 반환한다.
     *
     * @param email 생성할 Member의 email 정보
     * @return Member의 유저 키
     */
    String getUserKey(String email);

    /**
     * 사용자의 수시입출금 계좌 목록를 조회하고 반환한다
     *
     * @param id 조회할 Member id 정보
     */
    InquireDemandDepositAccountListResponseDto getInquireDemandDepositAccountList(Long id);

    /**
     * 사용자의 수시입출금 계좌(단건)를 조회하고 반환한다
     *
     * @param id 조회할 Member id 정보
     */
    InquireDemandDepositAccountResponseDto getInquireDemandDepositAccount(Long id);

    /**
     * 사용자의 예금 계좌를 생성하고, 반환한다.
     * 
     * @param id 생성할 Member id 정보
     * @param depositBalance 입금할 돈
     * @param bankCode 은행 기업
     * @param days 지난 날 수
     */
    CreateDepositAccountResponseDto createDepositAccount(Long id, Long depositBalance, String bankCode, int days);

    /**
     * 수시입출금 계좌에 돈을 입금한다(이체 아님)
     *
     * @param id 계좌 주인 member id 정보
     * @param accountNo 입금할 계좌 번호
     * @param transactionBalance 입금할 돈
     * @param transactionSummary 거래 내용
     */
    UpdateDemandDepositAccountDepositResponseDto updateDepositAccount(Long id, String accountNo, Long transactionBalance, String transactionSummary);

    /**
     * 수시입출금 계좌에 이체한다
     * 
     * @param id 계좌 주인 member id 정보
     * @param depositAccountNo 입금할 계좌
     * @param withdrawalAccountNo 출금할 계좌
     * @param transactionBalance 입금할 돈
     * @param depositTransactionSummary 입금 거래내용
     * @param withdrawalTransactionSummary 출금 거래내용
     */
    UpdateDemandDepositAccountTransferResponseDto updateDemandDepositAccountTransfer(Long id, String depositAccountNo, String withdrawalAccountNo, Long transactionBalance, String depositTransactionSummary, String withdrawalTransactionSummary);

    /**
     * 수시입출금 계좌의 거래 내역을 조회한다.
     *
     * @param id 계좌 주인 member id 정보
     * @param accountNo 조회할 계좌 번호
     * @param transactionType 거래 구분(M:입금, D:출금, A:전체)
     * @param orderByType 거래고유번호 기준(ASC:오름차순(이전거래), DESC: 내림차순(최근거래))
     *
     */
    InquireTransactionHistoryListResponseDto inquireTransactionHistoryList(Long id, String accountNo, String transactionType, String orderByType);

    /**
     * 수시입출금 계좌의 거래 내역을 조회한다.
     *
     * @param teamId 계좌 팀 id 정보
     * @param teamAccountNo 조회할 팀 번호
     * @param transactionType 거래 구분(M:입금, D:출금, A:전체)
     * @param orderByType 거래고유번호 기준(ASC:오름차순(이전거래), DESC: 내림차순(최근거래))
     *
     */
    public InquireTransactionHistoryListResponseDto inquireTransactionHistoryListByTeamId(Long teamId, String teamAccountNo, String transactionType, String orderByType);

    /**
     * 수시입출금 계좌를 해지한다.
     *
     * @param id 계좌 주인 memeber Id 정보
     * @param accountNo 해지할 계좌 번호
     * @param refundAccountNo 금액을 반환할 계좌 번호
     */
    DeleteDemandDepositAccountResponseDto deleteDemandDepositAccount(Long id, String accountNo, String refundAccountNo);

    /**
     * 수시입출금 계좌 잔액을 조회한다.
     *
     * @param id 계좌 주인 member id 정보
     * @param accountNo 잔액을 조회할 계좌 번호
     */
    InquireDemandDepositAccountBalanceResponseDto inquireDemandDepositAccountBalance(Long id, String accountNo);

    /**
     * 예금 계좌를 조회한다.
     *
     * @param id 계좌 주인 member id 정보
     * @param accountNo 조회할 예금 계좌번호 정보
     */
    InquireDepositInfoDetailResponseDto depositInfoDetail(Long id, String accountNo);

    /**
     * 예금 계좌를 해지한다.
     *
     * @param id 계좌 주인 member Id 정보
     * @param accountNo 해지할 계좌번호 정보
     */
    DeleteAccountResponseDto deleteAccount(Long id, String accountNo);

    /**
     * 수시입출금 계좌에 1억을 넣는다.
     *
     * @param userKey 게좌주인 userKey;
     * @param accountNo 생성된 계좌번호 정보
     */
    void updateDemandDepositAccount(String userKey, String accountNo);

    /**
     * 거래 번호를 통해 거래를 조회한다.
     *
     * @param id 멤버 ID
     * @param accountNo 멤버의 계좌
     * @param transactionUniqueNo 거래 번호
     */
    TransactionHistoryResponseDto transactionHistory(Long id, String accountNo, String transactionUniqueNo);
}

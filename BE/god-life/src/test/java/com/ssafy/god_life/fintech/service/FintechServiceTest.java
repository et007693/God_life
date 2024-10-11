package com.ssafy.god_life.fintech.service;

import com.ssafy.god_life.common.BaseTest;
import com.ssafy.god_life.global.fintech.dto.response.*;
import com.ssafy.god_life.global.fintech.service.FintechService;
import com.ssafy.god_life.global.header.service.HeaderService;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.member.service.MemberService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootTest
public class FintechServiceTest extends BaseTest {

    @Value("${apiKey}")
    String apiKey;

    @Autowired
    FintechService fintechService;

    @Autowired
    MemberService memberService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    HeaderService headerService;

//    @Test
//    void userKey를_생성한다() throws Exception{
//        //given
//        UserKeyRequestDto userKeyRequestDto = UserKeyRequestDto.builder()
//                .apiKey(apiKey)
//                .userId("testEmail15@test.testcodes.mm")
//                .build();
//
//        //when
//        WebClient webClient = WebClient.builder()
//                .baseUrl("https://finopenapi.ssafy.io/ssafy")
//                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
//                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
//                .build();
//
//        Mono<UserKeyResponseDto> response = webClient.post()
//                .uri("/api/v1/member")
//                .bodyValue(userKeyRequestDto)
//                .retrieve()
//                .bodyToMono(UserKeyResponseDto.class);
//
//        UserKeyResponseDto userKeyResponse = response.block();
//
//        String userKey = userKeyResponse.getUserKey();
//
//        //then
//        Assertions.assertNotEquals(null, userKey);
//    }

    @Test
    void 수시입출금_계좌생성한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mileage(1000)
                .build();

        memberRepository.save(member);

        // 금융 API POST 요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://finopenapi.ssafy.io/ssafy/api/v1")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .build();

        // when
        String accountNo = fintechService.createMemberDemandDepositAccount(member.getId(), "999-1-680d0037d8ec42");

//        HeaderRequestDto headerRequestDto = headerService.createHeader("createDemandDepositAccount", member.getUserKey());
//
//        // DTO 생성
//        CreateDemandDepositAccountRequestDto createDemandDepositAccountRequest = CreateDemandDepositAccountRequestDto.builder()
//                .Header(headerRequestDto)
//                .accountTypeUniqueNo("999-1-680d0037d8ec42")
//                .build();
//
//        // Response
//        Mono<CreateDemandDepositAccountResponseDto> response = webClient.post()
//                .uri("/edu/demandDeposit/createDemandDepositAccount")
//                .bodyValue(createDemandDepositAccountRequest)
//                .retrieve()
//                .bodyToMono(CreateDemandDepositAccountResponseDto.class);
//
//        System.out.println("header : " + headerRequestDto.toString());
//
//        CreateDemandDepositAccountResponseDto createDemandDepositAccountResponse = response.block();
//
//        String accountNo = createDemandDepositAccountResponse.getREC().getAccountNo();

        // then
//        System.out.println("accountNo : " + accountNo);
        Assertions.assertNotEquals(null, accountNo);
    }

    @Test
    void 사용자_계정_조회한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mileage(1000)
                .build();

        memberRepository.save(member);

        // when
        String userKey = fintechService.getUserKey("testEmail15@test.testcodes.mm");

        // then
//        System.out.println("userKey : " + userKey);
        Assertions.assertNotEquals(null, userKey);
        Assertions.assertEquals("546be87d-7bf9-4670-81e5-f1e2002aa42e", userKey);
    }

    @Test
    void 수시입출금_계좌_목록_조회한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mileage(1000)
                .build();

        memberRepository.save(member);

        // when
        InquireDemandDepositAccountListResponseDto i = fintechService.getInquireDemandDepositAccountList(member.getId());

        // then
        Assertions.assertNotEquals(null, i.getHeader());
        Assertions.assertNotEquals(null, i.getREC());

    }

    @Test
    void 수시입출금_계좌_단건_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9998812829524648")
                .mileage(1000)
                .build();

        memberRepository.save(member);

        // when
        InquireDemandDepositAccountResponseDto i = fintechService.getInquireDemandDepositAccount(member.getId());

//        System.out.println("Header : " + i.getHeader().toString());
//        System.out.println("REC : " + i.getREC().toString());

        // then
        Assertions.assertNotEquals(null, i.getHeader());
        Assertions.assertNotEquals(null, i.getREC());
    }

//    @Test
//    void 예금_계좌를_생성한다() throws Exception {
//        // given
//        Member member = Member.builder()
//                .nickname("ssafy")
//                .email("testEmail15@test.testcodes.mm")
//                .fineImmunityCount(3)
//                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
//                .mainAccountNo("9998812829524648")
//                .mileage(1000)
//                .build();
//
//        memberRepository.save(member);
//
//        // when
//        CreateDepositAccountResponseDto createDepositAccountResponse = fintechService.createDepositAccount(member.getId(), 1000000L);
//
////        System.out.println("Header : " + createDepositAccountResponse.getHeader().toString());
////        System.out.println("REC : " + createDepositAccountResponse.getREC().toString());
//
//        // then
//        Assertions.assertNotEquals(null, createDepositAccountResponse.getHeader());
//        Assertions.assertNotEquals(null, createDepositAccountResponse.getREC());
//    }

    @Test
    void 수시입출금_입금한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9998812829524648")
                .mileage(1000)
                .build();

        memberRepository.save(member);

        // when
        UpdateDemandDepositAccountDepositResponseDto updateDemandDepositAccountDepositResponseDto = fintechService.updateDepositAccount(member.getId(), "9998812829524648",1000000L, "입금");

//        System.out.println("Header : " + updateDemandDepositAccountDepositResponseDto.getHeader().toString());
//        System.out.println("REC : " + updateDemandDepositAccountDepositResponseDto.getREC().getTransactionUniqueNo());

        // then
        Assertions.assertNotEquals(null, updateDemandDepositAccountDepositResponseDto.getHeader());
        Assertions.assertNotEquals(null, updateDemandDepositAccountDepositResponseDto.getREC());
    }

//    @Test
//    void 수시입출금_계좌이체한다() throws Exception {
//        // given
//        Member member = Member.builder()
//                .nickname("ssafy")
//                .email("testEmail15@test.testcodes.mm")
//                .fineImmunityCount(3)
//                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
//                .mainAccountNo("9998812829524648")
//                .mileage(1000)
//                .build();
//
//        memberRepository.save(member);
//
//        // when
//        UpdateDemandDepositAccountTransferResponseDto updateDemandDepositAccountTransferResponseDto = fintechService.updateDemandDepositAccountTransfer(member.getId(), "9990699169445413", "9998812829524648", 2000000L, "입금할 계좌", "출금할 계좌");
//
////        System.out.println("Header : " + updateDemandDepositAccountTransferResponseDto.getHeader().toString());
////        System.out.println("REC : " + updateDemandDepositAccountTransferResponseDto.getREC().get(0).getAccountNo());
////        System.out.println("REC : " + updateDemandDepositAccountTransferResponseDto.getREC().get(1).getAccountNo());
////        System.out.println("REC : " + updateDemandDepositAccountTransferResponseDto.getREC().get(0).getTransactionTypeName());
////        System.out.println("REC : " + updateDemandDepositAccountTransferResponseDto.getREC().get(1).getTransactionTypeName());
//
//        // then
//        Assertions.assertNotEquals(null, updateDemandDepositAccountTransferResponseDto.getHeader());
//        Assertions.assertNotEquals(null, updateDemandDepositAccountTransferResponseDto.getREC());
//
//    }

    @Test
    void 수시입출금_계좌거래내역을_조회한다() throws Exception {
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9998812829524648")
                .mileage(1000)
                .build();

        memberRepository.save(member);

        // when
        InquireTransactionHistoryListResponseDto inquireTransactionHistoryListResponseDto1 = fintechService.inquireTransactionHistoryList(member.getId(), "9998812829524648","A", "DESC");
        InquireTransactionHistoryListResponseDto inquireTransactionHistoryListResponseDto2 = fintechService.inquireTransactionHistoryList(member.getId(), "9998812829524648","M", "DESC");
        InquireTransactionHistoryListResponseDto inquireTransactionHistoryListResponseDto3 = fintechService.inquireTransactionHistoryList(member.getId(), "9998812829524648","D", "DESC");

//        System.out.println("Header : " + inquireTransactionHistoryListResponseDto1.getHeader().toString());
//        System.out.println("REC : " + inquireTransactionHistoryListResponseDto1.getREC().getList().get(0).getTransactionTime());
//
//        System.out.println("Header : " + inquireTransactionHistoryListResponseDto2.getHeader().toString());
//        System.out.println("REC : " + inquireTransactionHistoryListResponseDto2.getREC().getList().get(0).getTransactionTime());
//
//        System.out.println("Header : " + inquireTransactionHistoryListResponseDto3.getHeader().toString());
//        System.out.println("REC : " + inquireTransactionHistoryListResponseDto3.getREC().getList().get(0).getTransactionTime());

        // then
        Assertions.assertNotEquals(null, inquireTransactionHistoryListResponseDto1.getHeader());
        Assertions.assertNotEquals(null, inquireTransactionHistoryListResponseDto2.getREC());
    }

//    @Test
//    void 수시입출금_계좌를_해지한다() throws Exception{
//        // given
//        Member member = Member.builder()
//                .nickname("ssafy")
//                .email("testEmail15@test.testcodes.mm")
//                .fineImmunityCount(3)
//                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
//                .mainAccountNo("9998812829524648")
//                .mileage(1000)
//                .build();
//
//        memberRepository.save(member);
//
//        // when
//        DeleteDemandDepositAccountResponseDto deleteDemandDepositAccountResponseDto = fintechService.deleteDemandDepositAccount(member.getId(), "9997973755457176", "9990699169445413");
////        System.out.println("Header : " + deleteDemandDepositAccountResponseDto.getHeader().toString());
////        System.out.println("REC : " + deleteDemandDepositAccountResponseDto.getREC().toString());
//
//
//        // then
//        Assertions.assertNotEquals(null, deleteDemandDepositAccountResponseDto.getHeader());
//        Assertions.assertNotEquals(null, deleteDemandDepositAccountResponseDto.getREC());
//    }

    @Test
    void 수시입출금_계좌잔액을_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9998812829524648")
                .mileage(1000)
                .build();
        memberRepository.save(member);

        // when
        InquireDemandDepositAccountBalanceResponseDto inquireDemandDepositAccountBalanceResponseDto = fintechService.inquireDemandDepositAccountBalance(member.getId(), "9995909077035770");
        System.out.println("Header : " + inquireDemandDepositAccountBalanceResponseDto.getHeader().toString());
        System.out.println("REC : " + inquireDemandDepositAccountBalanceResponseDto.getREC().toString());

        // then
        Assertions.assertNotEquals(null, inquireDemandDepositAccountBalanceResponseDto.getHeader());
        Assertions.assertNotEquals(null, inquireDemandDepositAccountBalanceResponseDto.getREC());
    }

    @Test
    void 예금을_조회한다() throws Exception{
        // given
        Member member = Member.builder()
                .nickname("ssafy")
                .email("testEmail15@test.testcodes.mm")
                .fineImmunityCount(3)
                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
                .mainAccountNo("9990263422745078")
                .mileage(1000)
                .build();
        memberRepository.save(member);

        // when
        InquireDepositInfoDetailResponseDto inquireDepositInfoDetailResponseDto = fintechService.depositInfoDetail(member.getId(), "0907646523");
        System.out.println("Header : " + inquireDepositInfoDetailResponseDto.getHeader().toString());
        System.out.println("REC : " + inquireDepositInfoDetailResponseDto.getREC().toString());

        // then
        Assertions.assertNotEquals(null, inquireDepositInfoDetailResponseDto.getHeader());
        Assertions.assertNotEquals(null, inquireDepositInfoDetailResponseDto.getREC());
    }

    @Test
    void 예금을_해지한다() throws Exception{
        // given
//        Member member = Member.builder()
//                .nickname("ssafy")
//                .email("testEmail15@test.testcodes.mm")
//                .fineImmunityCount(3)
//                .userKey("546be87d-7bf9-4670-81e5-f1e2002aa42e")
//                .mainAccountNo("9990263422745078")
//                .mileage(1000)
//                .build();
//        memberRepository.save(member);
//
//        // when
//        DeleteAccountResponseDto deleteAccountResponseDto = fintechService.deleteAccount(member.getId(), "9999911082");
//        System.out.println("Header : " + deleteAccountResponseDto.getHeader().toString());
//        System.out.println("REC : " + deleteAccountResponseDto.getREC().toString());
//
//        // then
//        Assertions.assertNotEquals(null, deleteAccountResponseDto.getHeader());
//        Assertions.assertNotEquals(null, deleteAccountResponseDto.getREC());

    }

}

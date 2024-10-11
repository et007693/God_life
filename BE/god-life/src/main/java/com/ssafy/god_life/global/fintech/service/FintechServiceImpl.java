package com.ssafy.god_life.global.fintech.service;

import com.ssafy.god_life.global.fintech.dto.request.*;
import com.ssafy.god_life.global.fintech.dto.response.*;
import com.ssafy.god_life.global.header.dto.HeaderRequestDto;
import com.ssafy.god_life.global.header.service.HeaderService;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.repository.TeamRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class FintechServiceImpl implements FintechService {

    private final MemberRepository memberRepository;

    private final HeaderService headerService;
    private final TeamRepository teamRepository;

    @Value("${apiKey}")
    String apiKey;

    // 금융 API POST 요청
    WebClient webClient = WebClient.builder()
            .baseUrl("https://finopenapi.ssafy.io/ssafy/api/v1")
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
            .build();

    //    @Override
//    public void createUserKey(Long id) {
//        Member member = memberRepository.findById(id).orElseThrow();
//        String memberEmail = member.getEmail();
//        Map<String, Object> requestBody = new HashMap<>();
//        requestBody.put("apiKey", apiKey);
//        requestBody.put("userId", memberEmail);
//
//        WebClient webClient = WebClient.builder().baseUrl("https://finopenapi.ssafy.io/ssafy/api/v1/member/").build();
//
//        Mono<UserKeyResponseDto> response = webClient.post()
//                .uri("/post-userKey")
//                .bodyValue(requestBody)
//                .retrieve()
//                .bodyToMono(UserKeyResponseDto.class);
//
//        UserKeyResponseDto userKeyResponse = response.block();
//
//        String userKey = userKeyResponse.getUserKey();
//
//        member = Member.builder()
//                .id(member.getId())
//                .nickname(member.getNickname())
//                .profileImageURL(member.getProfileImageURL())
//                .email(member.getEmail())
//                .mileage(member.getMileage())
//                .fineImmunityCount(member.getFineImmunityCount())
//                .userKey(userKey)
//                .mainAccountNo(member.getMainAccountNo())
//                .role(member.getRole())
//                .socialId(member.getSocialId())
//                .timeSetting(member.getTimeSetting())
//                .latitudeSetting(member.getLatitudeSetting())
//                .longitudeSetting(member.getLongitudeSetting())
//                .personal(member.getPersonal())
//                .build();
//    }

    // 사용자 userKey 생성
    @Override
    public String createUserKey(String email) {
        // Dto 생성
        UserKeyRequestDto userKeyRequestDto = UserKeyRequestDto.builder()
                .apiKey(apiKey)
                .userId(email)
                .build();

        // Response
        Mono<UserKeyResponseDto> response = webClient.post()
                .uri("/member")
                .bodyValue(userKeyRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(UserKeyResponseDto.class);

        UserKeyResponseDto userKeyResponse = response.block();

        String userKey = userKeyResponse.getUserKey();

        return userKey;
    }

    // 수시입출금 계좌 생성
    @Override
    public String createMemberDemandDepositAccount(Long id, String accountTypeUniqueNo) {

        log.error(LocalDateTime.now().toString());

        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        HeaderRequestDto headerRequestDto = headerService.createHeader("createDemandDepositAccount", member.getUserKey());

        // DTO 생성
        CreateDemandDepositAccountRequestDto createDemandDepositAccountRequest = CreateDemandDepositAccountRequestDto.builder()
                .Header(headerRequestDto)
                .accountTypeUniqueNo(accountTypeUniqueNo)
                .build();

        System.out.println("현재 날짜 : " + headerRequestDto.getTransmissionDate());
        System.out.println("현재 시간 : " + headerRequestDto.getTransmissionTime());

        // Response
        Mono<CreateDemandDepositAccountResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/createDemandDepositAccount")
                .bodyValue(createDemandDepositAccountRequest)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(CreateDemandDepositAccountResponseDto.class);

        CreateDemandDepositAccountResponseDto createDemandDepositAccountResponse = response.block();

        String accountNo = createDemandDepositAccountResponse.getREC().getAccountNo();

        return accountNo;
    }

    // 사용자 계정 조회(userKey 확인)
    @Override
    public String getUserKey(String email) {

        // Dto 생성
        UserKeyRequestDto userKeyRequestDto = UserKeyRequestDto.builder()
                .apiKey(apiKey)
                .userId(email)
                .build();

        // Response
        Mono<UserKeyResponseDto> response = webClient.post()
                .uri("/member/search")
                .bodyValue(userKeyRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(UserKeyResponseDto.class);

        UserKeyResponseDto userKeyResponse = response.block();

        String userKey = userKeyResponse.getUserKey();

        return userKey;
    }

    // 사용자 계좌 목록 조회
    @Override
    public InquireDemandDepositAccountListResponseDto getInquireDemandDepositAccountList(Long id) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        String userKey = member.getUserKey();
        HeaderRequestDto headerRequestDto = headerService.createHeader("inquireDemandDepositAccountList", userKey);

        Map<String, Object> requestMap = new HashMap<>();
        requestMap.put("Header", headerRequestDto);

        // Response
        Mono<InquireDemandDepositAccountListResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/inquireDemandDepositAccountList")
                .bodyValue(requestMap)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(InquireDemandDepositAccountListResponseDto.class);

        InquireDemandDepositAccountListResponseDto inquireDemandDepositAccountListResponse = response.block();

        return inquireDemandDepositAccountListResponse;
    }

    // 사용자 계좌 단건 조회
    @Override
    public InquireDemandDepositAccountResponseDto getInquireDemandDepositAccount(Long id) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        HeaderRequestDto headerRequestDto = headerService.createHeader("inquireDemandDepositAccount", member.getUserKey());

        InquireDemandDepositAccountRequestDto inquireDemandDepositAccountRequestDto = InquireDemandDepositAccountRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(member.getMainAccountNo())
                .build();

        // Response
        Mono<InquireDemandDepositAccountResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/inquireDemandDepositAccount")
                .bodyValue(inquireDemandDepositAccountRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(InquireDemandDepositAccountResponseDto.class);

        InquireDemandDepositAccountResponseDto inquireDemandDepositAccountResponse = response.block();

        return inquireDemandDepositAccountResponse;
    }

    // (개인미션) 예금 계좌 생성
    @Override
    public CreateDepositAccountResponseDto createDepositAccount(Long id, Long depositBalance, String bankCode, int days) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        HeaderRequestDto headerRequestDto = headerService.createHeader("createDepositAccount", member.getUserKey());

        CreateDepositAccountRequestDto createDepositAccountRequestDto = null;

        if(bankCode==null){
            bankCode="090";
        }

        if(bankCode.equals("090")) {
            if (days == 0) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-448c7a01434f4c")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 1) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-b0ecf3949f894c")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 2) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-508e7cfef5f14b")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 3) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-9507149cab8b4a")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 4) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-015ed8ea89fc4e")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 5) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-44387bc1a7ba45")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 6) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-0d9e7000caba45")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 7) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-8e7ba3d5e0f64b")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 8) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-5119ed79dcd84d")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 9) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-32816f7ccc7949")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 10) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-cecdbc25a6e640")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 11) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-d3ce2f56bfc640")
                        .depositBalance(depositBalance)
                        .build();
            } else if (days == 12) {
                createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                        .Header(headerRequestDto)
                        .withdrawalAccountNo(member.getMainAccountNo())
                        .accountTypeUniqueNo("090-2-c120acd7aed946")
                        .depositBalance(depositBalance)
                        .build();
            }
        } else if(bankCode.equals("011")) {
            // 농협
            createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                    .Header(headerRequestDto)
                    .withdrawalAccountNo(member.getMainAccountNo())
                    .accountTypeUniqueNo("011-2-3c19f40629d943")
                    .depositBalance(depositBalance)
                    .build();
        } else if (bankCode.equals("088")) {
            // 신한
            createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                    .Header(headerRequestDto)
                    .withdrawalAccountNo(member.getMainAccountNo())
                    .accountTypeUniqueNo("088-2-9a298c2e6ecf45")
                    .depositBalance(depositBalance)
                    .build();
        } else if(bankCode.equals("081")) {
            // 하나
            createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                    .Header(headerRequestDto)
                    .withdrawalAccountNo(member.getMainAccountNo())
                    .accountTypeUniqueNo("081-2-98873c0a2a4340")
                    .depositBalance(depositBalance)
                    .build();
        } else if(bankCode.equals("004")) {
            // 국민
            createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                    .Header(headerRequestDto)
                    .withdrawalAccountNo(member.getMainAccountNo())
                    .accountTypeUniqueNo("004-2-ee7fd337e07b44")
                    .depositBalance(depositBalance)
                    .build();

        } else {
            createDepositAccountRequestDto = CreateDepositAccountRequestDto.builder()
                    .Header(headerRequestDto)
                    .withdrawalAccountNo(member.getMainAccountNo())
                    .accountTypeUniqueNo("999-2-f339c6347ca545")
                    .depositBalance(depositBalance)
                    .build();
        }

        // Response
        Mono<CreateDepositAccountResponseDto> response = webClient.post()
                .uri("/edu/deposit/createDepositAccount")
                .bodyValue(createDepositAccountRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(CreateDepositAccountResponseDto.class);

        CreateDepositAccountResponseDto createDepositAccountResponse = response.block();

//        System.out.println("accountNo : " + createDepositAccountResponse.getREC().getAccountNo());

        return createDepositAccountResponse;
    }

    // 수시입출금 계좌 입금(이체 아님)
    @Override
    public UpdateDemandDepositAccountDepositResponseDto updateDepositAccount(Long id, String accountNo, Long transactionBalance, String transactionSummary) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        HeaderRequestDto headerRequestDto = headerService.createHeader("updateDemandDepositAccountDeposit", member.getUserKey());

        UpdateDemandDepositAccountDepositRequestDto updateDemandDepositAccountDepositRequestDto = UpdateDemandDepositAccountDepositRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(accountNo)
                .transactionBalance(transactionBalance)
                .transactionSummary(transactionSummary)
                .build();

        // Response
        Mono<UpdateDemandDepositAccountDepositResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountDeposit")
                .bodyValue(updateDemandDepositAccountDepositRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(UpdateDemandDepositAccountDepositResponseDto.class);

        UpdateDemandDepositAccountDepositResponseDto updateDemandDepositAccountResponse = response.block();

        return updateDemandDepositAccountResponse;
    }

    // 수시입출금 계좌 이체
    @Override
    public UpdateDemandDepositAccountTransferResponseDto updateDemandDepositAccountTransfer(Long id, String depositAccountNo, String withdrawalAccountNo, Long transactionBalance, String depositTransactionSummary, String withdrawalTransactionSummary) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));;
        HeaderRequestDto headerRequestDto = headerService.createHeader("updateDemandDepositAccountTransfer", member.getUserKey());

        UpdateDemandDepositAccountTransferRequestDto updateDemandDepositAccountTransferRequestDto = UpdateDemandDepositAccountTransferRequestDto.builder()
                .Header(headerRequestDto)
                .depositAccountNo(depositAccountNo)
                .depositTransactionSummary(depositTransactionSummary)
                .transactionBalance(transactionBalance)
                .withdrawalAccountNo(withdrawalAccountNo)
                .withdrawalTransactionSummary(withdrawalTransactionSummary)
                .build();

        // Response
        Mono<UpdateDemandDepositAccountTransferResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountTransfer")
                .bodyValue(updateDemandDepositAccountTransferRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(UpdateDemandDepositAccountTransferResponseDto.class);

        UpdateDemandDepositAccountTransferResponseDto updateDemandDepositAccountResponse = response.block();

        return updateDemandDepositAccountResponse;
    }

    // 수시입출금 계좌 거래 내역 조회
    @Override
    public InquireTransactionHistoryListResponseDto inquireTransactionHistoryList(Long id, String accountNo, String transactionType, String orderByType) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("Member를 찾을 수 없습니다."));
        HeaderRequestDto headerRequestDto = headerService.createHeader("inquireTransactionHistoryList", member.getUserKey());

        InquireTransactionHistoryListRequestDto inquireTransactionHistoryListRequestDto = InquireTransactionHistoryListRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(accountNo)
                .startDate("20200101")
                .endDate("20250101")
                .transactionType(transactionType)
                .orderByType(orderByType)
                .build();

        // Response
        Mono<InquireTransactionHistoryListResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/inquireTransactionHistoryList")
                .bodyValue(inquireTransactionHistoryListRequestDto)
                .retrieve()
            	.onStatus(HttpStatusCode::isError, clientResponse ->
                	clientResponse.bodyToMono(String.class)
                    	.flatMap(errorBody->{
                        	log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
                            	clientResponse.statusCode(), errorBody);
                        	return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
                    }))
                .bodyToMono(InquireTransactionHistoryListResponseDto.class);

        InquireTransactionHistoryListResponseDto inquireTransactionHistoryListResponse = response.block();

        return inquireTransactionHistoryListResponse;
    }

    // 수시입출금 계좌 거래 내역 조회(팀)
    @Override
    public InquireTransactionHistoryListResponseDto inquireTransactionHistoryListByTeamId(Long teamId, String teamAccountNo, String transactionType, String orderByType) {

        // Dto 생성
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new RuntimeException("Team을 찾을 수 없습니다."));
        Member member = memberRepository.findById(team.getMemberId()).orElseThrow(() -> new RuntimeException("Member를 찾을 수 없습니다."));

        HeaderRequestDto headerRequestDto = headerService.createHeader("inquireTransactionHistoryList", member.getUserKey());

        InquireTransactionHistoryListRequestDto inquireTransactionHistoryListRequestDto = InquireTransactionHistoryListRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(teamAccountNo)
                .startDate("20200101")
                .endDate("20250101")
                .transactionType(transactionType)
                .orderByType(orderByType)
                .build();

        // Response
        Mono<InquireTransactionHistoryListResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/inquireTransactionHistoryList")
                .bodyValue(inquireTransactionHistoryListRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(InquireTransactionHistoryListResponseDto.class);

        InquireTransactionHistoryListResponseDto inquireTransactionHistoryListResponse = response.block();

        return inquireTransactionHistoryListResponse;
    }

    // 수시입출금 계좌 해지
    @Override
    public DeleteDemandDepositAccountResponseDto deleteDemandDepositAccount(Long id, String accountNo, String refundAccountNo) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElse(null);
        HeaderRequestDto headerRequestDto = headerService.createHeader("deleteDemandDepositAccount", member.getUserKey());

        DeleteDemandDepositAccountRequestDto deleteDemandDepositAccountRequestDto = DeleteDemandDepositAccountRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(accountNo)
                .refundAccountNo(refundAccountNo)
                .build();

        // Response
        Mono<DeleteDemandDepositAccountResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/deleteDemandDepositAccount")
                .bodyValue(deleteDemandDepositAccountRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(DeleteDemandDepositAccountResponseDto.class);

        DeleteDemandDepositAccountResponseDto deleteDemandDepositAccountResponse = response.block();

        return deleteDemandDepositAccountResponse;
    }

    // 수시입출금 계좌 잔액 조회
    @Override
    public InquireDemandDepositAccountBalanceResponseDto inquireDemandDepositAccountBalance(Long id, String accountNo) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        HeaderRequestDto headerRequestDto = headerService.createHeader("inquireDemandDepositAccountBalance", member.getUserKey());

        InquireDemandDepositAccountRequestDto inquireDemandDepositAccountRequestDto = InquireDemandDepositAccountRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(accountNo)
                .build();

        // Response
        Mono<InquireDemandDepositAccountBalanceResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/inquireDemandDepositAccountBalance")
                .bodyValue(inquireDemandDepositAccountRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(InquireDemandDepositAccountBalanceResponseDto.class);

        InquireDemandDepositAccountBalanceResponseDto inquireDemandDepositAccountBalanceResponseDto = response.block();

        return inquireDemandDepositAccountBalanceResponseDto;
    }

    // 예금 계좌를 조회한다.
    @Override
    public InquireDepositInfoDetailResponseDto depositInfoDetail(Long id, String accountNo){

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        HeaderRequestDto headerRequestDto = headerService.createHeader("inquireDepositInfoDetail", member.getUserKey());

        InquireDemandDepositAccountRequestDto inquireDemandDepositAccountRequestDto = InquireDemandDepositAccountRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(accountNo)
                .build();

        // Response
        Mono<InquireDepositInfoDetailResponseDto> response = webClient.post()
                .uri("/edu/deposit/inquireDepositInfoDetail")
                .bodyValue(inquireDemandDepositAccountRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(InquireDepositInfoDetailResponseDto.class);

        InquireDepositInfoDetailResponseDto inquireDepositInfoDetailResponseDto = response.block();

        return inquireDepositInfoDetailResponseDto;
    }

    // 계좌 해지
    @Override
    public DeleteAccountResponseDto deleteAccount(Long id, String accountNo) {

        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        HeaderRequestDto headerRequestDto = headerService.createHeader("deleteAccount", member.getUserKey());

        InquireDemandDepositAccountRequestDto inquireDemandDepositAccountRequestDto = InquireDemandDepositAccountRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(accountNo)
                .build();

        // Response
        Mono<DeleteAccountResponseDto> response = webClient.post()
                .uri("/edu/deposit/deleteAccount")
                .bodyValue(inquireDemandDepositAccountRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(DeleteAccountResponseDto.class);

        DeleteAccountResponseDto deleteAccountResponseDto = response.block();

        return deleteAccountResponseDto;
    }

    // 첫 계좌 생성 시 천만원 입금
    @Override
    public void updateDemandDepositAccount(String userKey, String accountNo) {
        // Dto 생성
        HeaderRequestDto headerRequestDto = headerService.createHeader("updateDemandDepositAccountDeposit", userKey);

        UpdateDemandDepositAccountDepositRequestDto updateDemandDepositAccountDepositRequestDto = UpdateDemandDepositAccountDepositRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(accountNo)
                .transactionBalance(100000000L)
                .transactionSummary("가입 축하금")
                .build();

        // Response
        Mono<UpdateDemandDepositAccountDepositResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/updateDemandDepositAccountDeposit")
                .bodyValue(updateDemandDepositAccountDepositRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(UpdateDemandDepositAccountDepositResponseDto.class);

        UpdateDemandDepositAccountDepositResponseDto updateDemandDepositAccountDepositResponseDto = response.block();
    }

    // 이체 기록 단건 조회
    @Override
    public TransactionHistoryResponseDto transactionHistory(Long id, String accountNo, String transactionUniqueNo){
        // Dto 생성
        Member member = memberRepository.findById(id).orElseThrow(() -> new RuntimeException("id에 해당하는 멤버가 없습니다"));
        HeaderRequestDto headerRequestDto = headerService.createHeader("inquireTransactionHistory", member.getUserKey());

        InquireTransactionHistoryRequestDto inquireTransactionHistoryRequestDto = InquireTransactionHistoryRequestDto.builder()
                .Header(headerRequestDto)
                .accountNo(accountNo)
                .transactionUniqueNo(transactionUniqueNo)
                .build();

        // Response
        Mono<TransactionHistoryResponseDto> response = webClient.post()
                .uri("/edu/demandDeposit/inquireTransactionHistory")
                .bodyValue(inquireTransactionHistoryRequestDto)
                .retrieve()
				.onStatus(HttpStatusCode::isError, clientResponse ->
					clientResponse.bodyToMono(String.class)
						.flatMap(errorBody->{
							log.error("API 요청 실패: 상태 코드 = {}, 응답 본문 = {}",
								clientResponse.statusCode(), errorBody);
							return Mono.error(new RuntimeException("API 요청 실패: " + errorBody));
						}))
                .bodyToMono(TransactionHistoryResponseDto.class);

        TransactionHistoryResponseDto transactionHistoryResponseDto = response.block();

        return transactionHistoryResponseDto;
    }

}

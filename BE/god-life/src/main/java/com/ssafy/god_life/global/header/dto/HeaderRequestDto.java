package com.ssafy.god_life.global.header.dto;

import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder

public class HeaderRequestDto {
    private String apiName; // API 이름
    private String transmissionDate; // 전송일자
    private String transmissionTime; // 전송시각
    private String institutionCode; // 기관코드
    private String fintechAppNo; // 핀테크 앱 일련번호
    private String apiServiceCode; // API 서비스 코드
    private String institutionTransactionUniqueNo; // 기관거래고유번호
    private String apiKey; // API Key
    private String userKey; // User Key

}

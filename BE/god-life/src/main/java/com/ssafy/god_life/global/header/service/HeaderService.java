package com.ssafy.god_life.global.header.service;

import com.ssafy.god_life.global.header.dto.HeaderRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class HeaderService {

    @Value("${apiKey}")
    String apiKey;

    // 공통 Header 생성
    public HeaderRequestDto createHeader(String apiName, String userKey){

        // 시간 설정 & UUID20자리 생성
        String date = String.valueOf(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyyMMdd")));
        String time = String.valueOf(LocalTime.now().format(DateTimeFormatter.ofPattern("HHmmss")));
        String uuid = createUUID();

        HeaderRequestDto headerRequestDto = HeaderRequestDto.builder()
                .apiName(apiName)
                .transmissionDate(date)
                .transmissionTime(time)
                .institutionCode("00100")
                .fintechAppNo("001")
                .apiServiceCode(apiName)
                .institutionTransactionUniqueNo(date+time+uuid)
                .apiKey(apiKey)
                .userKey(userKey)
                .build();

        return headerRequestDto;
    }

    // UUID 생성(6자리)
    public String createUUID(){
        UUID uuid = UUID.randomUUID();

        // UUID의 일부를 가져와서 숫자로 변환
        long number = Math.abs(uuid.getMostSignificantBits()) % 1_000_000;  // 6자리 숫자
        String s = String.valueOf(number);
        for(int i = s.length(); i<6; i++)
            s = s + String.valueOf(i);
        return s;
    }
}

package com.ssafy.god_life.common;

import com.ssafy.god_life.global.header.dto.HeaderRequestDto;
import com.ssafy.god_life.global.header.service.HeaderService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@ActiveProfiles("test")
@Transactional
@SpringBootTest
public class HeaderTest {

    @Autowired
    HeaderService headerService;

    @Test
    void uuid_생성() throws Exception {
        headerService.createUUID();
    }

    @Test
    void Header생성() throws Exception {
        HeaderRequestDto headerRequestDto = headerService.createHeader("createDemandDepositAccount", "5b0d25fe-6cea-40c5-9e26-5193c99b4242");
        System.out.println(headerRequestDto.toString());
    }
}

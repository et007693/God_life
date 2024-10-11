package com.ssafy.god_life.member.controller;

import com.ssafy.god_life.common.ControllerTest;
import com.ssafy.god_life.member.dto.request.SetHomeRequestDto;
import com.ssafy.god_life.member.dto.response.MainPageResponseDto;
import com.ssafy.god_life.member.dto.response.MyPageResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class MemberControllerTest extends ControllerTest {

    @Test
    void 마이페이지에_필요한_데이터를_조회한다() throws Exception {
        // given
        given(memberService.getMyPageInfoById(any()))
                .willReturn(new MyPageResponseDto());

        // when & then
        mockMvc.perform(get("/member/mypage")
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 메인페이지에_필요한_데이터를_조회한다() throws Exception{
        // given
        given(memberService.getMainPageInfoByMemberId(any()))
                .willReturn(new MainPageResponseDto());

        // when & then
        mockMvc.perform(get("/main")
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 집을_설정한다() throws Exception{
        // given & when
        SetHomeRequestDto request = new SetHomeRequestDto();

        // then
        mockMvc.perform(post("/member/location")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

}

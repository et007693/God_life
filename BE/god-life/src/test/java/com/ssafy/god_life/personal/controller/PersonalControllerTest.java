package com.ssafy.god_life.personal.controller;

import com.ssafy.god_life.common.ControllerTest;
import com.ssafy.god_life.personal.dto.response.PersonalBoardInfoResponseDto;
import com.ssafy.god_life.personal.dto.response.CalendarInfoResponseDto;
import com.ssafy.god_life.personal.dto.response.PersonalDetailInfoResponseDto;
import com.ssafy.god_life.personal.dto.response.PersonalMissionResponseDto;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;

import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class PersonalControllerTest extends ControllerTest {

    @Test
//    @WithMockUser
    void 개인미션상세를_불러온다() throws Exception {
        // given
        given(personalService.getDetailByMemberId(anyLong()))
                .willReturn(new PersonalMissionResponseDto());

        // when
        mockMvc.perform(get("/personal")
                        .accept(MediaType.APPLICATION_JSON).with(oauth2Login())
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
//                .andExpect(jsonPath("$.message").value("개인 미션 조회에 성공하였습니다."));;

    }

    @Test
    @WithMockUser
    void 계좌_상세_내역을_조회한다() throws Exception {
        // given
        Long memberId = 1L;
        given(personalService.findPersonalDetailInfoByMemberId(memberId))
                .willReturn(new PersonalDetailInfoResponseDto());

        // when
        mockMvc.perform(get("/personal/account")
                        .accept(MediaType.APPLICATION_JSON).with(oauth2Login())
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    void 개인_미션_기록을_저장한다() throws Exception {
        // given & when
        MockMultipartFile picture = new MockMultipartFile(
                "picture",
                "thumbnail.png",
                MediaType.IMAGE_PNG_VALUE,
                "thumbnail".getBytes());

        // then
        mockMvc.perform(multipart("/personal/mission")
                        .file(picture)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 게시판을_조회한다() throws Exception {
        // given
        given(personalService.getBoardInfoByMemberId(anyLong(), anyInt(), anyInt()))
                .willReturn(new PersonalBoardInfoResponseDto());

        int year = 2024;
        int month = 10;

        // when & then
        mockMvc.perform(get("/personal/board")
                        .param("year", String.valueOf(year))
                        .param("month", String.valueOf(month))
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 캘린더를_조회한다() throws Exception {
        // given
        given(personalService.getCalendarInfoByMemberId(anyLong(), anyInt(), anyInt()))
                .willReturn(new CalendarInfoResponseDto());

        int year = 2024;
        int month = 10;

        // when & then
        mockMvc.perform(get("/personal/calendar")
                        .param("year", String.valueOf(year))
                        .param("month", String.valueOf(month))
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

}

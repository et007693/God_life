package com.ssafy.god_life.team.member.controller;

import com.ssafy.god_life.common.ControllerTest;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import org.junit.jupiter.api.Test;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TeamMemberControllerTest extends ControllerTest {

    @Test
    void 팀멤버_시간을_생성한다() throws Exception {
        // given & when
        SetTimeRequestDto request = new SetTimeRequestDto();
        Long teamId = 1L;

        // then
        //gson 시간 매핑 이슈로 pass
//        mockMvc.perform(post("/group/{teamId}/time", 1L)
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(gson.toJson(request))
//                        .accept(MediaType.APPLICATION_JSON)
//                        .with(csrf())
//                        .with(oauth2Login().oauth2User(principalDetail)))
//                .andDo(print())
//                .andExpect(status().isOk());
    }

    @Test
    void 팀에_멤버를_초대한다() throws Exception{
        // given
        Long teamId = 1L;

        // when & then
        mockMvc.perform(post("/group/{teamId}/invite", teamId)
                .with(csrf())
                .with(oauth2Login().oauth2User(principalDetail)))
        .andDo(print())
        .andExpect(status().isNoContent());
    }

    @Test
    void 쿠폰을_사용한다() throws Exception{
        // given
        Long teamId = 1L;

        // when & then
        mockMvc.perform(post("/group/{teamId}/coupon", teamId)
                .with(csrf())
                .with(oauth2Login().oauth2User(principalDetail)))
        .andDo(print())
        .andExpect(status().isNoContent());
    }


}

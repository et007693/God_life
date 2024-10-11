package com.ssafy.god_life.coupon.controller;

import com.ssafy.god_life.common.ControllerTest;
import com.ssafy.god_life.coupon.dto.request.CouponBuyRequestDto;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.mockito.BDDMockito.given;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class CouponControllerTest extends ControllerTest {

    @Test
    void 쿠폰_정보를_조회한다() throws Exception {
        // given
        given(couponService.getPrice())
                .willReturn(2000);

        // when & then
        mockMvc.perform(get("/coupon")
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 쿠폰을_구매한다() throws Exception {
        // given
        CouponBuyRequestDto request = new CouponBuyRequestDto();

        given(couponService.getPrice())
                .willReturn(2000);

        // when & then
        mockMvc.perform(post("/coupon")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isNoContent());
    }

}

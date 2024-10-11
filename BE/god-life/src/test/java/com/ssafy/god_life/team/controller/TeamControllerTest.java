package com.ssafy.god_life.team.controller;

import com.ssafy.god_life.common.ControllerTest;
import com.ssafy.god_life.global.fintech.dto.response.MyDemandDepositAccountInfoResponseDto;
import com.ssafy.god_life.global.fintech.dto.response.TeamPersonalTransactionResponseDto;
import com.ssafy.god_life.global.fintech.dto.response.UpdateDemandDepositAccountTransferResponseDto;
import com.ssafy.god_life.team.dto.request.*;
import com.ssafy.god_life.team.dto.response.*;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.oauth2Login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class TeamControllerTest extends ControllerTest {

    @Test
    void 팀을_생성한다() throws Exception {
        // given & when
        CreateTeamRequestDto request = new CreateTeamRequestDto();

        given(teamService.save(anyLong(), any(CreateTeamRequestDto.class)))
                .willReturn(new CreateTeamResponseDto());

        // then
        mockMvc.perform(post("/group")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 팀_상세정보를_조회한다() throws Exception {
        // given & when
        Long teamId = 1L;

        given(teamService.get(anyLong(), anyLong()))
                .willReturn(new TeamResponseDto());

        // then
        mockMvc.perform(get("/group/{teamId}", teamId)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 계좌를_이체한다() throws Exception{
        // given & when
        AccountTransferRequestDto request = new AccountTransferRequestDto();

        given(teamService.demandDepositAccountTransfer(anyLong(), anyLong(), anyLong()))
        .willReturn(new UpdateDemandDepositAccountTransferResponseDto());
        // then
        mockMvc.perform(post("/group/transfer")
        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
                .accept(MediaType.APPLICATION_JSON)
                .with(csrf())
                .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 팀계좌거래내역을_조회한다() throws Exception {
        // given & when
        Long teamId = 1L;

        AccountTransferRequestDto request = new AccountTransferRequestDto();

        given(teamService.inquireTransactionHistory(anyLong()))
                .willReturn(new TransactionListResponseDto());
        // then
        mockMvc.perform(get("/group/transaction/{teamId}", teamId)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    void 팀_정산하기정보를_조회한다() throws Exception {
        // given
        Long teamId = 1L;
        AdjustmentResponseDto mockAdjustmentResponse = new AdjustmentResponseDto(); // Mock 데이터를 추가로 구성할 수 있습니다.

        given(teamService.getAdjustment(anyLong(), anyLong()))
                .willReturn(mockAdjustmentResponse);

        // when & then
        mockMvc.perform(get("/group/adjustment/{teamId}", teamId)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    void 팀을_정산후_삭제한다() throws Exception {
        // given
        AdjustmentRequestDto request = new AdjustmentRequestDto();

        // when
        doNothing().when(teamService).postAdjustment(anyLong(), any(AdjustmentRequestDto.class));

        // then
        mockMvc.perform(post("/group/adjust")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 계좌정보를_조회한다() throws Exception {
        // given & when
        Long memberId = 1L;
        Long teamId = 1L;

        given(teamService.transferAccountInfo(anyLong(), anyLong()))
                .willReturn(new MyDemandDepositAccountInfoResponseDto());
        // then
        mockMvc.perform(get("/group/balance/{teamId}", teamId)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 팀_미션_기록을_저장한다() throws Exception {
        // given & when
        Long teamId = 1L;

        MockMultipartFile picture = new MockMultipartFile(
                "picture",
                "thumbnail.png",
                MediaType.IMAGE_PNG_VALUE,
                "thumbnail".getBytes());

        // then
        mockMvc.perform(multipart("/group/{teamId}/mission", teamId)
                        .file(picture)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 개인벌금이체기록을_조회한다() throws Exception {
        // given & when
        Long teamId = 1L;

        given(teamService.transactionHistoryListByMemberIdAndTeamId(anyLong(), anyLong()))
                .willReturn(new TeamPersonalTransactionResponseDto());

        // then
        mockMvc.perform(get("/group/personal/transaction/{teamId}", teamId)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 게시판을_조회한다() throws Exception {
        // given
        given(teamService.getBoardInfoByIdAndMemberId(anyLong(), anyLong(),anyInt(), anyInt()))
                .willReturn(new TeamBoardInfoResponseDto());

        int year = 2024;
        int month = 10;
        Long teamId = 1L;

        // when & then
        mockMvc.perform(get("/group/{teamId}/board", teamId)
                        .param("year", String.valueOf(year))
                        .param("month", String.valueOf(month))
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 베팅을_생성한다() throws Exception{
        //given
        Long teamId = 1L;

        // then
        mockMvc.perform(put("/group/{teamId}/betting", teamId)
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 베팅에_참가한다() throws Exception{
        //given
        BettingRequestDto request = new BettingRequestDto();
        Long teamId = 1L;

        //when & then
        mockMvc.perform(post("/group/{teamId}/betting", teamId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(request))
                        .with(csrf())
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void 베팅정보를_조회한다() throws Exception{
        // given & when
        Long teamId = 1L;

        given(teamService.getBettingInfo(anyLong()))
                .willReturn(new BettingInfoResponseDto());

        // then
        mockMvc.perform(get("/group/{teamId}/betting", teamId)
                        .accept(MediaType.APPLICATION_JSON)
                        .with(oauth2Login().oauth2User(principalDetail)))
                .andDo(print())
                .andExpect(status().isOk());
    }

}

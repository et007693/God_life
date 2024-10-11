package com.ssafy.god_life.member.controller;

import com.ssafy.god_life.global.dto.CommonResponseDto;
import com.ssafy.god_life.global.dto.LoginMember;
import com.ssafy.god_life.member.dto.request.SetHomeRequestDto;
import com.ssafy.god_life.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/member/mypage")
    public ResponseEntity<?> getMyPageInfo(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(memberService.getMyPageInfoById(loginMember.getId()))
                .message("마이페이지 조회에 성공했습니다")
                .build();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/main")
    public ResponseEntity<?> getMainPageInfo(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember) {
        CommonResponseDto<Object> response = CommonResponseDto.builder()
                .data(memberService.getMainPageInfoByMemberId(loginMember.getId()))
                .message("메인페이지 조회에 성공했습니다")
                .build();

        return ResponseEntity.ok(response);
    }

    @PostMapping("/member/location")
    public ResponseEntity<?> saveHome(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                      @RequestBody SetHomeRequestDto requestDto) {
        memberService.setHomeById(loginMember.getId(), requestDto);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/member")
    public ResponseEntity<?> delete(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember) {
        memberService.deleteById(loginMember.getId());
        return ResponseEntity.noContent().build();
    }
}

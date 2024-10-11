package com.ssafy.god_life.team.member.controller;

import com.ssafy.god_life.global.dto.LoginMember;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import com.ssafy.god_life.team.member.service.TeamMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class TeamMemberController {

    private final TeamMemberService teamMemberService;

    @PostMapping("/group/{teamId}/time")
    public ResponseEntity<?> setTime(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                     @PathVariable("teamId") Long teamId,
                                     @RequestBody SetTimeRequestDto setTimeRequestDto) {

        teamMemberService.setTime(teamId, loginMember.getId(), setTimeRequestDto);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/group/{teamId}/invite")
    public ResponseEntity<?> inviteMember(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                     @PathVariable("teamId") Long teamId) {

        teamMemberService.save(teamId, loginMember.getId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/group/{teamId}/coupon")
    public ResponseEntity<?> useCoupon(@AuthenticationPrincipal(expression = "loginMember") LoginMember loginMember,
                                     @PathVariable("teamId") Long teamId) {

        teamMemberService.useCoupon(teamId, loginMember.getId());
        return ResponseEntity.noContent().build();
    }
}

package com.ssafy.god_life.team.member.service;

import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import com.ssafy.god_life.team.member.dto.response.TeamInfoResponseDto;

public interface TeamMemberService {

    /**
     * 팀 정보에 필요한 설정시간, 잔여벌금, 멤버별 프로필 이미지를 조회한다.
     *
     * @param memberId 멤버 ID
     * @return 팀 정보 응답 DTO
     */
    TeamInfoResponseDto getTeamInfo(Long teamId, Long memberId);

    /**
     * 팀에 멤버를 넣는 작업, TeamMember 생성
     *
     * @param teamId 팀 ID
     * @param memberId 멤버 ID
     * @return 생성된 TeamMember ID
     */
    Long save(Long teamId, Long memberId);

    /**
     * 팀 멤버의 시간을 설정한다
     *
     * @param teamId 팀 ID
     * @param memberId 멤버 ID
     * @param setTimeRequestDto 시간 설정 요청 DTO
     */
    void setTime(Long teamId, Long memberId, SetTimeRequestDto setTimeRequestDto);

    /**
     * 미션 여부 판별 및 벌금 업데이트
     *
     */
    void fineCheck();

    /**
     * 면제권을 사용한다.
     *
     * @param teamId 팀 ID
     * @param memberId 멤버 ID
     */
    void useCoupon(Long teamId, Long memberId);
}

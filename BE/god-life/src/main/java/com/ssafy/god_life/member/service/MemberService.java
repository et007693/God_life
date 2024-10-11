package com.ssafy.god_life.member.service;

import com.ssafy.god_life.member.dto.request.SetHomeRequestDto;
import com.ssafy.god_life.member.dto.response.MainPageResponseDto;
import com.ssafy.god_life.member.dto.response.MyPageResponseDto;

public interface MemberService {

    /**
     * 마이페이지의 정보를 조회한다.
     *
     * @param id 조회할 Member의 id
     * @return 마이페이지 정보
     */
    MyPageResponseDto getMyPageInfoById(Long id);

    /**
     * 메인페이지의 정보를 조회한다.
     *
     * @param id 멤버 id
     * @return 메인페이지 정보
     */
    MainPageResponseDto getMainPageInfoByMemberId(Long id);

    /**
     * 집을 설정한다.
     *
     * @param setHomeRequestDto 집 설정 요청 DTO
     */
    void setHomeById(Long id, SetHomeRequestDto setHomeRequestDto);

    /**
     * 멤버를 삭제한다.
     *
     * @param id 삭제할 멤버의 ID
     */
    void deleteById(Long id);
}

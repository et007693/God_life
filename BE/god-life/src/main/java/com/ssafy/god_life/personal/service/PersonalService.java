package com.ssafy.god_life.personal.service;

import com.ssafy.god_life.global.fintech.dto.response.CreateDepositAccountResponseDto;
import com.ssafy.god_life.personal.domain.Personal;
import com.ssafy.god_life.personal.dto.request.PersonalMissionRequestDto;
import com.ssafy.god_life.personal.dto.response.CalendarInfoResponseDto;
import com.ssafy.god_life.personal.dto.response.PersonalDetailInfoResponseDto;
import com.ssafy.god_life.personal.dto.response.PersonalMissionResponseDto;
import com.ssafy.god_life.personal.dto.response.PersonalBoardInfoResponseDto;
import com.ssafy.god_life.team.member.dto.request.SetTimeRequestDto;
import org.springframework.stereotype.Service;

@Service
public interface PersonalService {
    /**
     * Personal의 id로 personal을 조회한다
     *
     * @param id 조회할 personal의 id
     * @return 조회한 personal
     */
    Personal findById(Long id);

    /**
     * Member의 id로 member에 personal 저장한다.
     *
     * @param personal 저장할 개인미션
     * @param id 저장할 멤버 ID
     *
     * @return 저장된 개인미션의 PK
     */
    Long save(Personal personal, Long id);

    /**
     * Member의 id로 개인 미션에 필요한 정보를 조회한다
     *
     * @param memberId 조회할 Member의 id
     * @return 조회한 정보들로 생성한 PersonalMissionDto
     */
    PersonalMissionResponseDto getDetailByMemberId(Long memberId);


    /**
     * Member의 id로 계좌 상세 내역을 조회한다.
     *
     * @param memberId 찾을 멤버의 ID
     */
    PersonalDetailInfoResponseDto findPersonalDetailInfoByMemberId(Long memberId);

//    /**
//     * Member의 id로 PersonalBoardDto를 조회한다.
//     *
//     * @param memberId 찾을 멤버의 ID
//     * */
//    List<PersonalBoardResponseDto> findPersonalBoardDtoByMemberId(Long memberId);

    /**
     * 월별 게시판 정보를 조회한다.
     *
     * @param memberId 찾을 멤버의 ID
     * @param year 찾을 년도
     * @param month 찾을 달
     * */
    PersonalBoardInfoResponseDto getBoardInfoByMemberId(Long memberId, int year, int month);

    /**
     * 월별 캘린더 정보를 조회한다.
     *
     * @param memberId 찾을 멤버의 ID
     * @param year 찾을 년도
     * @param month 찾을 달
     */
    CalendarInfoResponseDto getCalendarInfoByMemberId(Long memberId, int year, int month);

    /**
     * 오늘 규칙의 달성 여부를 조회한다.
     *
     * @param id 개인 규칙 ID
     * @return 달성 여부
     */
    boolean isCompletedToday(Long id);

    /**
     * Member의 id를 가져오고, PersonalMissionRequestDto를 입력받아 개인 미션을 생성한다.
     *
     * @param memberId 생성할 멤버의 ID
     * @param personalMissionRequestDto 입력받을 정보
     */
    void createPersonalMission(Long memberId, PersonalMissionRequestDto personalMissionRequestDto);

    /**
     * Member의 id로 Personal의 예금을 해지한다.
     *
     * @param memberId  member의 id
     *
     *
     */
    CreateDepositAccountResponseDto deleteAccountByMemberId(Long memberId);

    /**
     * 개인 미션의 시간을 설정한다
     *
     * @param setTimeRequestDto 시간 설정 요청 DTO
     */
    void setTime(Long personalId, SetTimeRequestDto setTimeRequestDto);

    /**
     * 멤버 삭제 시 삭제 된다
     *
     * @param id 개인미션 ID
     */
    void deleteById(Long id);
}

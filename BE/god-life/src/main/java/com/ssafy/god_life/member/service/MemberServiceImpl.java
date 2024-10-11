package com.ssafy.god_life.member.service;

import com.ssafy.god_life.coupon.history.repository.CouponHistoryRepository;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.dto.request.SetHomeRequestDto;
import com.ssafy.god_life.member.dto.response.MainPageResponseDto;
import com.ssafy.god_life.member.dto.response.MyPageResponseDto;
import com.ssafy.god_life.member.dto.response.RoomInfoResponseDto;
import com.ssafy.god_life.member.exception.MemberNotFoundException;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.personal.domain.Personal;
import com.ssafy.god_life.personal.service.PersonalService;
import com.ssafy.god_life.team.betting.repository.BettingRepository;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.history.repository.TeamRuleHistoryRepository;
import com.ssafy.god_life.team.history.service.TeamRuleHistoryService;
import com.ssafy.god_life.team.member.domain.TeamMember;
import com.ssafy.god_life.team.member.repository.TeamMemberRepository;
import com.ssafy.god_life.team.repository.TeamRepository;
import com.ssafy.god_life.team.service.TeamService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final PersonalService personalService;
    private final TeamRuleHistoryService teamRuleHistoryService;
    private final CouponHistoryRepository couponHistoryRepository;
    private final TeamRuleHistoryRepository teamRuleHistoryRepository;
    private final TeamRepository teamRepository;
    private final BettingRepository bettingRepository;
    private final TeamService teamService;

    @Override
    public MyPageResponseDto getMyPageInfoById(Long id) {
        return memberRepository.findMyPageInfoById(id)
                .orElseThrow(() -> new MemberNotFoundException("나중에 수정"));
    }

    @Override
    public MainPageResponseDto getMainPageInfoByMemberId(Long id) {

        Member findMember = memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException("해당 Id에 해당하는 멤버가 없습니다"));

        List<RoomInfoResponseDto> personalRoomList = new ArrayList<>();
        List<RoomInfoResponseDto> teamRoomList;

        //주말이라면 완수로 표시
        DayOfWeek dayOfWeek = LocalDate.now().getDayOfWeek();
        //주말
        if (dayOfWeek.equals(DayOfWeek.SATURDAY) || dayOfWeek.equals(DayOfWeek.SUNDAY)) {
            log.info("주말 메인화면 조회");
            //개인미션
            if(findMember.hasPersonal()){
                Personal personal = findMember.getPersonal();
                RoomInfoResponseDto personalRoomInfo = RoomInfoResponseDto.builder()
                        .roomId(personal.getId())
                        .rule(personal.getRule())
                        .isCompleted(true)
                        .build();
                personalRoomList.add(personalRoomInfo);
            }
            //팀미션
            teamRoomList = new ArrayList<>();
            List<TeamMember> teamMembers = teamMemberRepository.findAllByMemberId(id);
            teamMembers.stream()
                    .map(teamMember -> RoomInfoResponseDto.builder()
                            .roomId(teamMember.getTeam().getId())
                            .rule(teamMember.getTeam().getRule())
                            .isCompleted(true)
                            .build()).forEach(teamRoomList::add);
            //평일
        } else {
            log.info("평일 메인화면 조회");
            //개인미션
            if(findMember.hasPersonal()){
                Personal personal = findMember.getPersonal();

                RoomInfoResponseDto personalRoomInfo = RoomInfoResponseDto.builder()
                        .roomId(personal.getId())
                        .rule(personal.getRule())
                        .isCompleted(personalService.isCompletedToday(personal.getId()))
                        .build();

                personalRoomList.add(personalRoomInfo);
            }
            //팀미션
            teamRoomList = teamRuleHistoryService.getSimpleTeamRuleHistoryToday(id);
        }

        return MainPageResponseDto.builder()
                .profileImage(findMember.getProfileImageURL())
                .isLocationSet(findMember.isLocationSet())
                .personalRoomList(personalRoomList)
                .teamRoomList(teamRoomList)
                .build();
    }

    @Override
    public void setHomeById(Long id, SetHomeRequestDto setHomeRequestDto) {
        Member findMember = memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException("해당 Id에 해당하는 멤버가 없습니다"));

        findMember.saveHome(setHomeRequestDto);
    }

    @Override
    public void deleteById(Long id) {
        Member findMember = memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException("해당 Id에 해당하는 멤버가 없습니다"));

        //개인 미션 및 수행 기록 삭제
        if(findMember.hasPersonal()){
            personalService.deleteById(findMember.getPersonal().getId());
        }

        //쿠폰 구매 내역 삭제
        couponHistoryRepository.deleteAllByMemberId(id);

        //팀 기록 삭제
        teamRuleHistoryRepository.deleteAllByMemberId(id);



        //팀에서 방장이라면 삭제, 아니면 방장 변경
        List<TeamMember> teamMembers = teamMemberRepository.findAllByMemberId(id);
        for (TeamMember teamMember : teamMembers) {
            Team team = teamMember.getTeam();
            //베팅 정보 삭제
            bettingRepository.deleteByMemberIdAndTeamId(id, team.getId());

            List<TeamMember> oneTeamMembers = teamMemberRepository.findByTeamId(team.getId());
            int memberCount = oneTeamMembers.size();
            //방에 혼자만 있으면 폭파
            if(memberCount == 1){
                teamMemberRepository.deleteByMemberIdAndTeamId(id, team.getId());
                teamRepository.deleteById(team.getId());
            } else {
                //방에 여러명이고 방장이면 변경
                if(team.getMemberId().equals(id)){
                    teamMemberRepository.deleteByMemberIdAndTeamId(id, team.getId());
                    team.changeMaster(oneTeamMembers.get(0).getMember().getId());
                }
            }
        }
        memberRepository.deleteById(id);
    }
}

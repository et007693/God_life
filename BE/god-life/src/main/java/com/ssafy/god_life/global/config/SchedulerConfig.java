package com.ssafy.god_life.global.config;

import com.ssafy.god_life.personal.history.service.PersonalRuleHistoryService;
import com.ssafy.god_life.team.domain.Team;
import com.ssafy.god_life.team.member.service.TeamMemberService;
import com.ssafy.god_life.team.repository.TeamRepository;
import com.ssafy.god_life.team.service.TeamService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@EnableScheduling
@Configuration
public class SchedulerConfig {

    private final PersonalRuleHistoryService personalRuleHistoryService;
    private final TeamService teamService;
    private final TeamMemberService teamMemberService;

    private final TeamRepository teamRepository;

    @Value("${schedule.use}")
    private boolean isActivated;

    @Scheduled(cron = "${schedule.cron}")
    public void addAllHistory() {
        if (isActivated) {
            personalRuleHistoryService.addAllTodayHistory();
            teamService.addAllTeamHistory();
        }
    }

    //매주 월~목 오전 3시에 조건을 체크하고 베팅 생성
    //조건1: 베팅이 이미 열린 적이 있다면 pass
    //조건2: 전체 인원수 * 1000 이상의 잔액이 남아있는지 확인
    //테스트로 5분마다 베팅 발생
    @Scheduled(cron = "0 * * * * 1-5")
    public void openBetting() {
        if (isActivated) {
            List<Team> teams = teamRepository.findAll();
            teams.stream()
                    .filter(team -> teamService.isPossibleMakeBetting(team.getId()))
                    .forEach(team -> teamService.makeBetting(team.getId()));
        }
    }

    //매월 첫번째날 베팅 열린 기록 초기화
    @Scheduled(cron = "0 0 3 1 * *")
    public void resetBetting() {
        if (isActivated) {
            List<Team> teams = teamRepository.findAll();
            teams.forEach(Team::resetBetting);
        }
    }

    //    @Scheduled(cron = "30 14 13 * * 2-6")
    @Scheduled(cron = "57 * * * * 1-5")
    public void resultBet() {
        if (isActivated) {
            teamService.resultBet();
//          ---  테스트용 코드
            List<Team> teams = teamRepository.findAll();
            teams.forEach(Team::resetBetting);
        }
    }

    @Scheduled(cron = "0 5 0 * * 2-6")
    public void delayedFineCheck() {
        if (isActivated) {
            teamMemberService.fineCheck();
        }
    }
}

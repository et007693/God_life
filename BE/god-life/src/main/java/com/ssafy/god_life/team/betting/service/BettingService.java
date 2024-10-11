package com.ssafy.god_life.team.betting.service;

public interface BettingService {

    /**
     * 방에 있는 멤버가 베팅을 한다
     *
     * @param memberId 베팅을 하는 member ID
     * @param teamId 베팅이 존재하는 team ID
     * @param betSuccess 성공 시 true, 실패 시 false
     */
    void bet(Long memberId, Long teamId, boolean betSuccess);

}

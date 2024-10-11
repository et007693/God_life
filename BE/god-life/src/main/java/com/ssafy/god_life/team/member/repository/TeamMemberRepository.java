package com.ssafy.god_life.team.member.repository;

import com.ssafy.god_life.team.member.domain.TeamMember;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {

    Optional<TeamMember> findByTeamIdAndMemberId(Long teamId, Long memberId);

    List<TeamMember> findByTeamId(Long teamId);

    @Transactional
    void deleteByTeamId(Long teamId);

    List<TeamMember> findAllByMemberId(Long memberId);

    @Query("SELECT tm " +
            "FROM TeamMember tm " +
            "WHERE tm.team.id = :teamId " +
            "AND tm.prefixFine = (SELECT MAX(tm.prefixFine) " +
                                    "FROM TeamMember tm " +
                                    "WHERE tm.team.id = :teamId)")
    List<TeamMember> findMaxPrefixFineByTeamId(Long teamId);

    void deleteByMemberIdAndTeamId(Long memberId, Long teamId);
}

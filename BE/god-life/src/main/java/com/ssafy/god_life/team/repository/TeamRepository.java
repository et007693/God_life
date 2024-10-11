package com.ssafy.god_life.team.repository;

import com.ssafy.god_life.team.domain.Team;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

}

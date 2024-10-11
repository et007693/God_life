package com.ssafy.god_life.fund.repository;

import com.ssafy.god_life.fund.entity.FundInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FundInfoRepository extends JpaRepository<FundInfo, Long> {

}

package com.ssafy.god_life.personal.history.domain;

import com.ssafy.god_life.global.domain.BaseTime;
import com.ssafy.god_life.personal.domain.Personal;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class PersonalRuleHistory extends BaseTime {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean isCompleted;

    @Column(columnDefinition = "mediumblob")
    private String completeImage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "personal_id", nullable = false)
    private Personal personal;

    public void complete(String image){
        this.isCompleted = true;
        this.completeImage = image;
    }


}

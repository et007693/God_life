package com.ssafy.god_life.member.domain;

import com.ssafy.god_life.global.domain.BaseTime;
import com.ssafy.god_life.member.dto.request.SetHomeRequestDto;
import com.ssafy.god_life.personal.domain.Personal;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Member extends BaseTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nickname;

    private String profileImageURL;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int mileage;

    @Column(nullable = false)
    @ColumnDefault("0")
    private int fineImmunityCount;

    private String userKey;

    private String mainAccountNo;

    private MemberRole role;

    private Long socialId;

    private String homeName;

    @Column
    private Double latitudeSetting;

    @Column
    private Double longitudeSetting;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "personal_id")
    private Personal personal;

    public Long makePersonal(Personal personal) {
        this.personal = personal;
        return personal.getId();
    }

    public void deletePersonal() {
        this.personal = null;
    }

    public boolean hasPersonal() {
        return personal != null;
    }

    public void addMileage(int amount) {
        mileage += amount;
    }

    public void useMileage(int amount) {
        this.mileage -= amount;
    }

    public void addFineImmunity(int amount) {
        this.fineImmunityCount += amount;
    }

    public void useFineImmunity() {
        this.fineImmunityCount -= 1;
    }

    public void saveHome(SetHomeRequestDto requestDto) {
        this.homeName = requestDto.getLocationName();
        this.latitudeSetting = requestDto.getLat();
        this.longitudeSetting = requestDto.getLng();
    }

    public boolean isLocationSet() {
        return this.homeName != null;
    }

    public void saveAccountNo(String accountNo) {
        this.mainAccountNo = accountNo;
    }
}

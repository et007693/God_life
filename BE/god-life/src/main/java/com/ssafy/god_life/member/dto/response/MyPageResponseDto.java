package com.ssafy.god_life.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MyPageResponseDto {

    private String nickname;
    private String profileImage;
    private int mileage;
    private int fineImmunityCount;


}

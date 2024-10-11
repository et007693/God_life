package com.ssafy.god_life.global.fintech.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserKeyResponseDto {
    private String userId;
    private String username;
    private String institutionCode;
    private String userKey;
    private String created;
    private String modified;
}

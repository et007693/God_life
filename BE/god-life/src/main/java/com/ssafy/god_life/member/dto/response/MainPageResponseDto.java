package com.ssafy.god_life.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class MainPageResponseDto {

    private String profileImage;
    private boolean isLocationSet;
    private List<RoomInfoResponseDto> personalRoomList;
    private List<RoomInfoResponseDto> teamRoomList;
}

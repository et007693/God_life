package com.ssafy.god_life.member.dto.request;

import com.ssafy.god_life.member.dto.response.RoomInfoResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SetHomeRequestDto {

    private double lat;
    private double lng;
    private String locationName;
}

package com.ssafy.god_life.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
@Data
public class CommonResponseDto<T> {

    private T data;
    private String message;
}

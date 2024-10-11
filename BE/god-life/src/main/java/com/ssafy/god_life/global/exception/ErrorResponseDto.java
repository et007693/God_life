package com.ssafy.god_life.global.exception;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ErrorResponseDto {

    private String responseCode;
    private String responseMessage;
}

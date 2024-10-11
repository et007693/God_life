package com.ssafy.god_life.global.jwt.exception;

import com.ssafy.god_life.global.exception.GlobalErrorCode;
import lombok.Getter;

@Getter
public class CustomJwtException extends RuntimeException{

    private final GlobalErrorCode errorCode;

    public CustomJwtException(GlobalErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

}

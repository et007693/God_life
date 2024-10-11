package com.ssafy.god_life.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum GlobalErrorCode {

    JWT_EXPIRED("JWT001", HttpStatus.UNAUTHORIZED, "액세스 토큰이 만료되었습니다"),
    JWT_INVALID("JWT002", HttpStatus.UNAUTHORIZED, "액세스 토큰이 유효하지 않습니다"),
    JWT_NOT_BEGIN_WITH_BEARER("JWT003", HttpStatus.UNAUTHORIZED, "BEARER 로 시작하지 않는 올바르지 않은 토큰 형식입니다"),
    JWT_NOT_FOUND("JWT004", HttpStatus.UNAUTHORIZED, "토큰이 전달되지 않았습니다"),
    REQUEST_NOT_FOUND("REQ003", HttpStatus.NOT_FOUND, "요청한 리소스를 찾을 수 없습니다"),
    REQUEST_METHOD_NOT_ALLOWED("REQ004", HttpStatus.METHOD_NOT_ALLOWED, "요청한 메서드를 사용할 수 없습니다"),
    REQUEST_INVALID("REQ005", HttpStatus.BAD_REQUEST, "요청이 잘못되었습니다");

    private final String code;
    private final HttpStatusCode statusCode;
    private final String message;

    GlobalErrorCode(String code, HttpStatusCode statusCode, String message) {
        this.code = code;
        this.statusCode = statusCode;
        this.message = message;
    }
}


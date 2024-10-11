package com.ssafy.god_life.global.exception;

import com.ssafy.god_life.coupon.exception.NotEnoughMileageException;
import com.ssafy.god_life.global.jwt.exception.CustomJwtException;
import com.ssafy.god_life.team.betting.exception.MemberAlreadyBettingException;
import com.ssafy.god_life.team.exception.TeamBalanceNotEnoughException;
import com.ssafy.god_life.team.member.exception.MemberAlreadyExistException;
import com.ssafy.god_life.team.member.exception.NoDelayedFineException;
import com.ssafy.god_life.team.member.exception.NotEnoughCouponException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<?> handleException(Exception e) {
        e.printStackTrace();
        log.error("[Exception] 오류 발생 : {}", e.getMessage());
        ErrorResponseDto errorResponseDto = ErrorResponseDto.builder()
                .responseMessage(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorResponseDto);
    }

    @ExceptionHandler(NotEnoughMileageException.class)
    protected ResponseEntity<?> handleNotEnoughMileageException(NotEnoughMileageException e) {
        log.error("[NotEnoughMileageException] 마일리지 부족!");
        ErrorResponseDto errorResponseDto = ErrorResponseDto.builder()
                .responseMessage(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(errorResponseDto);
    }

    @ExceptionHandler(MemberAlreadyExistException.class)
    protected ResponseEntity<?> handleMemberAlreadyExistException(MemberAlreadyExistException e) {
        log.error("[MemberAlreadyExistException] 이미 방에 있는 멤버!");
        ErrorResponseDto errorResponseDto = ErrorResponseDto.builder()
                .responseCode("U101")
                .responseMessage(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(errorResponseDto);
    }

    @ExceptionHandler(CustomJwtException.class)
    protected ResponseEntity<?> handleCustomJwtException(CustomJwtException e) {
        GlobalErrorCode errorCode = e.getErrorCode();
        log.error("[CustomJwtExceptionException] = {}", errorCode.getMessage());
        ErrorResponseDto errorResponseDto = ErrorResponseDto.builder()
                .responseCode(errorCode.getCode())
                .responseMessage(errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getStatusCode())
                .body(errorResponseDto);
    }

    @ExceptionHandler(TeamBalanceNotEnoughException.class)
    protected ResponseEntity<?> handleTeamBalanceNotEnoughException(TeamBalanceNotEnoughException e) {
        log.error("[TeamBalanceNotEnoughException] 베팅 생성 잔액 부족!");
        ErrorResponseDto errorResponseDto = ErrorResponseDto.builder()
                .responseMessage(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(errorResponseDto);

    }

    @ExceptionHandler(MemberAlreadyBettingException.class)
    protected ResponseEntity<?> handleMemberAlreadyBettingException(MemberAlreadyBettingException e) {
        log.error("[MemberAlreadyBettingException] 이미 베팅에 참가한 멤버!");
        ErrorResponseDto errorResponseDto = ErrorResponseDto.builder()
                .responseMessage(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(errorResponseDto);

    }

    @ExceptionHandler(NoDelayedFineException.class)
    protected ResponseEntity<?> handleNoDelayedFineException(NoDelayedFineException e) {
        log.error("[NoDelayedFineException] 밀린 벌금이 없습니다!");
        ErrorResponseDto errorResponseDto = ErrorResponseDto.builder()
                .responseMessage(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(errorResponseDto);

    }

    @ExceptionHandler(NotEnoughCouponException.class)
    protected ResponseEntity<?> handleNotEnoughCouponException(NotEnoughCouponException e) {
        log.error("[NotEnoughCouponException] 사용 가능한 쿠폰이 없습니다!");
        ErrorResponseDto errorResponseDto = ErrorResponseDto.builder()
                .responseMessage(e.getMessage())
                .build();
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(errorResponseDto);

    }
}

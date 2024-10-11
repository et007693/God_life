package com.ssafy.god_life.global.jwt.controller;

import com.ssafy.god_life.global.exception.GlobalErrorCode;
import com.ssafy.god_life.global.jwt.exception.CustomJwtException;
import com.ssafy.god_life.global.jwt.utils.JwtConstants;
import com.ssafy.god_life.global.jwt.utils.JwtUtils;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
public class JwtController {

    @PostMapping("/refresh")
    public void refresh(@RequestHeader("Authorization") String authHeader, HttpServletRequest request,
                        HttpServletResponse response) {
        String refreshToken = null;

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refreshToken")) {
                    refreshToken = cookie.getValue();
                }
            }
        }
        if (authHeader == null) {
            throw new CustomJwtException(GlobalErrorCode.JWT_NOT_FOUND);
        } else if (!authHeader.startsWith(JwtConstants.JWT_TYPE)) {
            throw new CustomJwtException(GlobalErrorCode.JWT_NOT_BEGIN_WITH_BEARER);
        }

        String accessToken = JwtUtils.getTokenFromHeader(authHeader);
        log.info("Refresh Token = {}", refreshToken);
        //만료되지 않았을 때 기존 토큰 값 반환
        if (!JwtUtils.isExpired(accessToken)) {
            return;
        }

        log.info("check");

        Map<String, Object> claims = JwtUtils.validateToken(refreshToken);
        String newAccessToken = JwtUtils.generateToken(claims, JwtConstants.ACCESS_EXP_TIME);

        String newRefreshToken = refreshToken;
        long expTime = JwtUtils.tokenRemainTime((Long) claims.get("exp"));
        log.info("Refresh Token Remain Expire Time = {}", expTime);

        if (expTime <= 60) {
            newRefreshToken = JwtUtils.generateToken(claims, JwtConstants.REFRESH_EXP_TIME);
        }
        Cookie cookie = new Cookie("accessToken", newAccessToken);
        cookie.setHttpOnly(false);
        cookie.setMaxAge(3600);
        cookie.setPath("/");
        Cookie cookie2 = new Cookie("refreshToken", newRefreshToken);
        cookie2.setHttpOnly(false);
        cookie2.setMaxAge(360000);
        cookie2.setPath("/");

        response.addCookie(cookie);
        response.addCookie(cookie2);

    }
}

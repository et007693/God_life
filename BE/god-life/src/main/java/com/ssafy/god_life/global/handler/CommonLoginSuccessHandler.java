package com.ssafy.god_life.global.handler;

import com.ssafy.god_life.global.dto.PrincipalDetail;
import com.ssafy.god_life.global.jwt.utils.JwtConstants;
import com.ssafy.god_life.global.jwt.utils.JwtUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import java.io.IOException;
import java.util.Map;

@Slf4j
public class CommonLoginSuccessHandler implements AuthenticationSuccessHandler {

    @Value("${redirect-url}")
    public String redirectURL;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        log.info("--------------------------- CommonLoginSuccessHandler ---------------------------");
        PrincipalDetail principal = (PrincipalDetail) authentication.getPrincipal();

        log.info("authentication.getPrincipal() = {}", principal);

        Map<String, Object> responseMap = principal.getLoginMemberInfo();
//
//        responseMap.put("accessToken", JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME));
//
//        Gson gson = new Gson();
//        String json = gson.toJson(responseMap);
//
//        response.setContentType("application/json; charset=UTF-8");
//
//        PrintWriter writer = response.getWriter();
//        writer.println(json);
//        writer.flush();


        String accessToken = JwtUtils.generateToken(responseMap, JwtConstants.ACCESS_EXP_TIME);
        String refreshToken = JwtUtils.generateToken(responseMap, JwtConstants.REFRESH_EXP_TIME);
//        response.setHeader("Authorization", "Bearer " + accessToken);
        Cookie cookie = new Cookie("accessToken", accessToken);
        cookie.setHttpOnly(false);
        cookie.setMaxAge(3600);
        cookie.setPath("/");
        Cookie cookie2 = new Cookie("refreshToken", refreshToken);
        cookie2.setHttpOnly(false);
        cookie2.setMaxAge(360000);
        cookie2.setPath("/");

        response.addCookie(cookie);
        response.addCookie(cookie2);
        response.sendRedirect(redirectURL);
    }
}

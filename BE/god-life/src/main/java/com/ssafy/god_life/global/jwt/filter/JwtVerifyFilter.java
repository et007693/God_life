package com.ssafy.god_life.global.jwt.filter;

import com.google.gson.Gson;
import com.ssafy.god_life.global.exception.GlobalErrorCode;
import com.ssafy.god_life.global.jwt.exception.CustomJwtException;
import com.ssafy.god_life.global.jwt.utils.JwtConstants;
import com.ssafy.god_life.global.jwt.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.PatternMatchUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Map;

@Slf4j
public class JwtVerifyFilter extends OncePerRequestFilter {

    //필터를 통과해야 하는 url 설정
    private static final String[] whiteList = {"/signUp", "/login", "/refresh", "/", "/index.html", "/favicon.ico"};

    /**
     * 요청한 토큰의 헤더를 검증하는 메서드
     *
     * @param header 요청한 토큰의 헤더 ex)Bearer
     */
    private static void checkAuthorizationHeader(String header) {
        log.info("--------------------------- Jwt Header Verify ---------------------------");
        if (header == null) {
            throw new CustomJwtException(GlobalErrorCode.JWT_NOT_FOUND);
        } else if (!header.startsWith(JwtConstants.JWT_TYPE)) {
            throw new CustomJwtException(GlobalErrorCode.JWT_NOT_BEGIN_WITH_BEARER);
        }
    }

    /**
     * 요청 url이 통과해야하는 url인지 검사
     *
     * @param request 요청 객체
     * @return 통과해야 된다면 true, 아니라면 false
     * @throws ServletException
     */
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String requestURI = request.getRequestURI().replace("/api/v1", "");
        log.info("requestURI = {}", requestURI);
        return PatternMatchUtils.simpleMatch(whiteList, requestURI);
    }

    /**
     * 필터 메인 로직
     *
     * @param request     요청 객체
     * @param response    응답 객체
     * @param filterChain 필터 체인
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("--------------------------- JwtVerifyFilter ---------------------------");

        String authHeader = request.getHeader(JwtConstants.JWT_HEADER);
        try {
            checkAuthorizationHeader(authHeader);
            String token = JwtUtils.getTokenFromHeader(authHeader);
            Authentication authentication = JwtUtils.getAuthentication(token);

            log.info("authentication = {}", authentication);

            //SecurityContext에 인증된 정보를 저장
            SecurityContextHolder.getContext().setAuthentication(authentication);

            filterChain.doFilter(request, response);
        } catch (CustomJwtException e) {
            Gson gson = new Gson();
            GlobalErrorCode errorCode = e.getErrorCode();
            String json = gson.toJson(Map.of("responseCode", errorCode.getCode(), "responseStatus", errorCode.getMessage()));
            response.setStatus(errorCode.getStatusCode().value());
            response.setContentType("application/json; charset=UTF-8");
            PrintWriter printWriter = response.getWriter();
            printWriter.println(json);
            printWriter.close();
        } catch (Exception e){
            Gson gson = new Gson();
            String json = gson.toJson(Map.of("responseCode", 500, "responseStatus", e.getMessage()));
            response.setContentType("application/json; charset=UTF-8");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            PrintWriter printWriter = response.getWriter();
            printWriter.println(json);
            printWriter.close();
        }


    }

}

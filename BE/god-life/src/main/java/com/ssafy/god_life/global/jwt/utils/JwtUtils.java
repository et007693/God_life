package com.ssafy.god_life.global.jwt.utils;

import com.ssafy.god_life.global.dto.LoginMember;
import com.ssafy.god_life.global.dto.PrincipalDetail;
import com.ssafy.god_life.global.exception.GlobalErrorCode;
import com.ssafy.god_life.global.jwt.exception.CustomJwtException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.crypto.SecretKey;
import java.time.ZonedDateTime;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
public class JwtUtils {


    private static final SecretKey secretKey = JwtSecretKeyProvider.secretKey;

    /**
     *
     * @param header 전달된 JWT 토큰
     * @return Bearer를 제외한 토큰 실체 부분
     */
    public static String getTokenFromHeader(String header){
        return header.split(" ")[1];
    }

    /**
     * AccessToken or RefreshToken을 생성하는 메서드
     *
     * @param valueMap 토큰에 들어갈 정보
     * @param validTime 유효 시간(분)
     * @return 생성된 토큰
     */
    public static String generateToken(Map<String, Object> valueMap, int validTime) {
//        try {
////            key = Keys.hmacShaKeyFor(JwtUtils.secretKey.getBytes(StandardCharsets.UTF_8));
//            key = Jwts.SIG.HS256.key().build();
//        } catch (Exception e) {
//            throw new RuntimeException(e.getMessage());
//        }

        return Jwts.builder()
                .header().add(Map.of("typ", "JWT")).and()
                .claims(valueMap)
                .issuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .expiration(Date.from(ZonedDateTime.now().plusMinutes(validTime).toInstant()))
                .signWith(secretKey)
                .compact();
    }

    /**
     * 검증된 토큰 정보로 객체를 조회하고, 권한을 부여하는 메서드
     *
     * @param token 토큰 값
     * @return 인증된 UsernamePasswordAuthenticationToken 객체
     */
    public static Authentication getAuthentication(String token) {
        log.info("--------------------------- GET Authentication ---------------------------");

        Map<String, Object> claims = validateToken(token);

        Long id = Long.valueOf((String.valueOf(claims.get("id"))));
        String nickname = (String) claims.get("nickname");
        String role = (String) claims.get("role");
        LoginMember loginMember = LoginMember.builder()
                .id(id)
                .nickname(nickname)
                .role(role)
                .build();

        Set<SimpleGrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(role));
        PrincipalDetail principalDetail = new PrincipalDetail(loginMember, authorities);

        return new UsernamePasswordAuthenticationToken(principalDetail, "", authorities);
    }

    /**
     * 토큰을 검증하는 메서드
     *
     * @param token 토큰값
     * @return 토큰의 claim 값
     */
    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claim = null;
        try {
//            SecretKey key = Keys.hmacShaKeyFor(JwtUtils.secretKey.getBytes(StandardCharsets.UTF_8));
            claim = Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (ExpiredJwtException expiredJwtException) {
            throw new CustomJwtException(GlobalErrorCode.JWT_EXPIRED);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new CustomJwtException(GlobalErrorCode.JWT_INVALID);
        }
        return claim;
    }

    /**
     * 토큰 만료를 체크하는 메서드
     *
     * @param token 토큰 값
     * @return 만료되었으면 true, 아니라면 false
     */
    public static boolean isExpired(String token) {
        try {
            validateToken(token);
        } catch (CustomJwtException e) {
            if(e.getErrorCode().equals(GlobalErrorCode.JWT_EXPIRED)){
                return true;
            } else {
                throw e;
            }
        } catch (Exception e){
            return false;
        }
        return false;
    }

    /**
     * 토큰의 잔여시간을 조회하는 메서드
     *
     * @param expTime 토큰의 만료시간
     * @return 잔여 시간
     */
    public static long tokenRemainTime(Long expTime) {
        Date expDate = new Date(expTime * 1000);
        long remainMs = expDate.getTime() - System.currentTimeMillis();
        return remainMs / (1000*60);
    }
}

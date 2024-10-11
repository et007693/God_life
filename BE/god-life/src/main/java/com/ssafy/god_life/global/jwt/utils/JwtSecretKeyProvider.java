package com.ssafy.god_life.global.jwt.utils;

import io.jsonwebtoken.Jwts;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Getter
@Component
public class JwtSecretKeyProvider {

    public static SecretKey secretKey;

    @PostConstruct
    public void init() {
        secretKey = generateSecretKey();
    }

    private SecretKey generateSecretKey() {
        SecretKey key = Jwts.SIG.HS256.key().build();
        return key;
    }
}

package com.ssafy.god_life.global.config;

import com.ssafy.god_life.global.handler.CommonLoginFailHandler;
import com.ssafy.god_life.global.handler.CommonLoginSuccessHandler;
import com.ssafy.god_life.global.jwt.filter.JwtVerifyFilter;
import com.ssafy.god_life.global.oauth2.service.OAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@EnableMethodSecurity
@RequiredArgsConstructor
@Configuration
public class SecurityConfig {

    private final OAuth2UserService oAuth2UserService;

    /**
     * CORS 설정 정보
     *
     * @return CORS 설정 객체
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        //자원 공유를 허락할 Origin 설정
        corsConfiguration.setAllowedOriginPatterns(List.of("*"));
        //허용할 Method
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        //허용할 Header
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        //클라이언트의 응답에 쿠키, 인증 헤더 포함 허용 설정
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        //모든 경로에 대해서 CORS 적용
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }

    //비밀번호 암호화 시 사용
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    //로그인 성공 시 처리하는 handler
    @Bean
    public CommonLoginSuccessHandler commonLoginSuccessHandler() {
        return new CommonLoginSuccessHandler();
    }

    //로그인 실패 시 처리하는 handler
    @Bean
    public CommonLoginFailHandler commonLoginFailHandler() {
        return new CommonLoginFailHandler();
    }

    //JWT 토큰을 검증하는 Filter
    @Bean
    public JwtVerifyFilter jwtVerifyFilter() {
        return new JwtVerifyFilter();
    }

    //Spring Security 설정
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{

        //CORS 설정 객체 등록
        http.cors(httpSecurityCorsConfigurer ->
                httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource()));

        //csrf 비활성화
        http.csrf(AbstractHttpConfigurer::disable);

        //세션 생성 비활성화
        http.sessionManagement(httpSecuritySessionManagementConfigurer ->
            httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        //접근 권한
        http.authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
                authorizationManagerRequestMatcherRegistry.anyRequest().permitAll());

        //로그인 전 토큰 검증 필터
        http.addFilterBefore(jwtVerifyFilter(), UsernamePasswordAuthenticationFilter.class);

        //OAuth2 관련 설정
        http.oauth2Login(httpSecurityOAuth2LoginConfigurer ->
                httpSecurityOAuth2LoginConfigurer.loginPage("/oauth2/login")
                        .successHandler(commonLoginSuccessHandler())
                        .failureHandler(commonLoginFailHandler())
                        .userInfoEndpoint(userInfoEndpointConfig ->
                                userInfoEndpointConfig.userService(oAuth2UserService)));


        return http.build();
    }
}

package com.ssafy.god_life.global.dto;

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Data
public class PrincipalDetail implements OAuth2User {

    private LoginMember loginMember;
    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public PrincipalDetail(LoginMember loginMember, Collection<? extends GrantedAuthority> authorities) {
        this.loginMember = loginMember;
        this.authorities = authorities;
    }

    public PrincipalDetail(LoginMember loginMember, Collection<? extends GrantedAuthority> authorities, Map<String, Object> attributes) {
        this.loginMember = loginMember;
        this.authorities = authorities;
        this.attributes = attributes;
    }

    /**
     * JWT 생성 시 claim에 들어갈 정보를 불러오는 메서드
     *
     * @return claim에 들어갈 정보들
     */
    public Map<String, Object> getLoginMemberInfo() {
        Map<String, Object> info = new HashMap<>();

        info.put("id", loginMember.getId());
        info.put("nickname", loginMember.getNickname());
        info.put("role", loginMember.getRole());

        return info;
    }


    @Override
    public String getName() {
        return loginMember.getNickname();
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
}

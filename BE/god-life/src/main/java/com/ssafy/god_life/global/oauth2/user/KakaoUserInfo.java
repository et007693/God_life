package com.ssafy.god_life.global.oauth2.user;

import java.util.Map;

public class KakaoUserInfo {

    public static Long socialId;
    public static Map<String, Object> account;
    public static Map<String, Object> profile;

    public KakaoUserInfo(Map<String, Object> attributes) {
        socialId = Long.valueOf((String.valueOf(attributes.get("id"))));
        account = (Map<String, Object>) attributes.get("kakao_account");
        profile = (Map<String, Object>) account.get("profile");
    }

    public String getNickname() {
        return String.valueOf(profile.get("nickname"));
    }

    public String getProfileImageURL() {
        return String.valueOf(profile.get("profile_image_url"));
    }

    public String getEmail() {
        return String.valueOf(account.get("email"));
    }

    public Long getSocialId() {
        return socialId;
    }
}

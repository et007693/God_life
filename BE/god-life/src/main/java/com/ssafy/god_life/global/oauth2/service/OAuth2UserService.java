package com.ssafy.god_life.global.oauth2.service;

import com.ssafy.god_life.global.dto.LoginMember;
import com.ssafy.god_life.global.dto.PrincipalDetail;
import com.ssafy.god_life.global.fintech.service.FintechService;
import com.ssafy.god_life.global.oauth2.user.KakaoUserInfo;
import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.domain.MemberRole;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class OAuth2UserService extends DefaultOAuth2UserService {

    private final MemberRepository memberRepository;

    private final MemberService memberService;

    private final FintechService fintechService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("--------------------------- OAuth2UserService ---------------------------");

        //Kakao로부터 사용자 정보를 가져와 객체 생성
        OAuth2User oAuth2User = super.loadUser(userRequest);

        //사용자 정보 추출
        Map<String, Object> attributes = oAuth2User.getAttributes();

        log.info("OAuth2User(Kakao 객체) = {}", oAuth2User);
        log.info("attributes(사용자 정보) = {}", attributes);

        //카카오에서 식별하는 id
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        log.info("nameAttributeKey(Kakao id) = {}", userNameAttributeName);

        //필요한 값들이 담긴 객체 생성(닉네임, 프로필 이미지 URL, 이메일, 소셜 ID)
        KakaoUserInfo kakaoUserInfo = new KakaoUserInfo(attributes);
        String name = kakaoUserInfo.getNickname();
        String profileImage = kakaoUserInfo.getProfileImageURL();
        String email = kakaoUserInfo.getEmail();
        Long socialId =  kakaoUserInfo.getSocialId();

        //DB에 존재하지 않을 경우 멤버를 생성
        Member member = memberRepository.findBySocialId(socialId)
                .orElseGet(() -> saveMember(name, profileImage, email, socialId));

        //JWT 생성 시 claim에 넣을 DTO 정보
        LoginMember loginMember = LoginMember.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .role(member.getRole().getValue())
                .build();

        return new PrincipalDetail(loginMember,
                Collections.singleton(new SimpleGrantedAuthority(member.getRole().getValue())),
                attributes);
    }

    /**
     * 카카오 로그인 성공 시 DB에 멤버를 저장하는 메서드
     *
     * @param nickname 닉네임
     * @param socialId 카카오 안의 소셜 ID
     * @return 멤버 엔티티
     */
    public Member saveMember(String nickname, String profileImageURL, String email, Long socialId) {
        log.info("--------------------------- saveMember ---------------------------");

        String userKey = null;
        try{
            userKey = fintechService.getUserKey(email);
        } catch(Exception e){

        }
        Member newMember;
        if(null == userKey) {
            newMember = Member.builder()
                    .nickname(nickname)
                    .profileImageURL(profileImageURL)
                    .email(email)
                    .socialId(socialId)
                    .role(MemberRole.USER)
                    .userKey(fintechService.createUserKey(email))
                    .build();
        } else {
            newMember = Member.builder()
                    .nickname(nickname)
                    .profileImageURL(profileImageURL)
                    .email(email)
                    .socialId(socialId)
                    .role(MemberRole.USER)
                    .userKey(userKey)
                    .build();
        }
        Member member = memberRepository.save(newMember);
        String accountNo = fintechService.createMemberDemandDepositAccount(member.getId(), "999-1-680d0037d8ec42");

        member.saveAccountNo(accountNo);

        fintechService.updateDemandDepositAccount(member.getUserKey(), member.getMainAccountNo());

        return member;

    }
}

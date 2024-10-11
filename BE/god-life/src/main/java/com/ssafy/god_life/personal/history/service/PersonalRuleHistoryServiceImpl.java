package com.ssafy.god_life.personal.history.service;

import com.ssafy.god_life.member.domain.Member;
import com.ssafy.god_life.member.exception.MemberNotFoundException;
import com.ssafy.god_life.member.repository.MemberRepository;
import com.ssafy.god_life.personal.domain.Personal;
import com.ssafy.god_life.personal.history.domain.PersonalRuleHistory;
import com.ssafy.god_life.personal.history.repository.PersonalRuleHistoryRepository;
import com.ssafy.god_life.personal.repository.PersonalRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class PersonalRuleHistoryServiceImpl implements PersonalRuleHistoryService {

    private final PersonalRuleHistoryRepository personalRuleHistoryRepository;
    private final MemberRepository memberRepository;
    private final PersonalRepository personalRepository;

    @Override
    public PersonalRuleHistory findById(Long id) {
        return personalRuleHistoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<PersonalRuleHistory> findAllByPersonalId(Long personalId) {
        return personalRuleHistoryRepository.findAllByPersonalId(personalId);
    }

    @Override
    public int countByPersonalId(Long personalId) {
        return personalRuleHistoryRepository.countByPersonalId(personalId);
    }

    @Override
    public int countCompletedByPersonalId(Long personalId) {
        return personalRuleHistoryRepository.countByPersonalIdAndIsCompletedTrue(personalId);
    }

    @Override
    public float calculatePersonalIsCompleted(Long personalId) {
        return (float) countCompletedByPersonalId(personalId)/(float)countByPersonalId(personalId) * 100;
    }

    @Override
    public int countByPersonalIdAndCreatedYearAndCreatedMonth(Long personalId, int year, int month) {
        return personalRuleHistoryRepository.countByIdAndYearAndMonth(personalId, year, month);
    }

    @Override
    public int countByPersonalIdAndCreatedYearAndCreatedMonthAndCompleted(Long personalId, int year, int month) {
        return personalRuleHistoryRepository.countCompletedByIdAndYearAndMonth(personalId, year, month);
    }

    @Override
    public List<PersonalRuleHistory> findByPersonalIdAndCreatedYearAndCreatedMonth(Long personalId, int year, int month) {
        return personalRuleHistoryRepository.findByPersonalIdAndYearAndMonth(personalId, year, month);
    }

    @Override
    public float calculatePersonalIsCompletedByYearAndMonth(Long personalId, int year, int month) {
        if((float) personalRuleHistoryRepository.countByIdAndYearAndMonth(personalId, year, month)==0)
            return 0.0f;
        return (float) personalRuleHistoryRepository
                .countCompletedByIdAndYearAndMonth(personalId, year, month)/(float) personalRuleHistoryRepository
                .countByIdAndYearAndMonth(personalId, year, month) * 100;
    }

    @Override
    public void completeMission(MultipartFile picture, Long memberId) throws IOException {
        //personalId로 오늘자에 해당하는 기록 가져와 업데이트 필요
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException("해당 Id에 해당하는 멤버가 없습니다"));
        Personal personal = member.getPersonal();
        PersonalRuleHistory personalHistory = personalRuleHistoryRepository.findTodayByPersonalId(personal.getId())
                .orElseThrow(() -> new RuntimeException("ID에 해당하는 개인 미션이 없습니다"));

        String image = encodeImageToBase64(picture);
        personalHistory.complete(image);
    }

    @Override
    public void addAllTodayHistory() {
        List<PersonalRuleHistory> personalRuleHistories = personalRuleHistoryRepository.findAll();
        personalRuleHistories.stream()
                .map(personalRuleHistory -> PersonalRuleHistory.builder()
                .personal(personalRuleHistory.getPersonal())
                .build()).forEach(personalRuleHistoryRepository::save);
    }

    private String encodeImageToBase64(MultipartFile image) throws IOException {
        return Base64.getEncoder().encodeToString(image.getBytes());
    }

    private byte[] decodeBase64ToImage(String base64Image) {
        return Base64.getDecoder().decode(base64Image);
    }
}

package com.ssafy.god_life.team.member.exception;

public class MemberAlreadyExistException extends RuntimeException {
    public MemberAlreadyExistException(String message) {
        super(message);
    }
}

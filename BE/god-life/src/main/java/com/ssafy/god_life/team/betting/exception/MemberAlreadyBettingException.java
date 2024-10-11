package com.ssafy.god_life.team.betting.exception;

public class MemberAlreadyBettingException extends RuntimeException{
    public MemberAlreadyBettingException(String message) {
        super(message);
    }
}

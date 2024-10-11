package com.ssafy.god_life.team.exception;

public class TeamBalanceNotEnoughException extends RuntimeException{
    public TeamBalanceNotEnoughException(String message) {
        super(message);
    }
}

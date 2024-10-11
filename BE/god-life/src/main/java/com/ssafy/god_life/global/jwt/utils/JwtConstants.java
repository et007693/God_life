package com.ssafy.god_life.global.jwt.utils;

public class JwtConstants {
    //1시간
    public static final int ACCESS_EXP_TIME = 60;
    //24시간
    public static final int REFRESH_EXP_TIME = 60 * 24;


    public static final String JWT_HEADER = "Authorization";
    public static final String JWT_TYPE = "Bearer";


}

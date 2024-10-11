package com.ssafy.god_life;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class GodLifeApplication {

    public static void main(String[] args) {

        SpringApplication.run(GodLifeApplication.class, args);
    }

}

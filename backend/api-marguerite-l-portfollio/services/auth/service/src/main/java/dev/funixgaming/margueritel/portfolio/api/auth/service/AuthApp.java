package dev.funixgaming.margueritel.portfolio.api.auth.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "dev.funixgaming")
public class AuthApp {

    static void main(String[] args) {
        SpringApplication.run(AuthApp.class, args);
    }

}

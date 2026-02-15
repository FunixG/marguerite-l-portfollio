package dev.funixgaming.margueritel.portfolio.api.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients(basePackages = "dev.funixgaming.margueritel")
@SpringBootApplication(scanBasePackages = "dev.funixgaming.margueritel")
public class AuthApp {

    static void main(String[] args) {
        SpringApplication.run(AuthApp.class, args);
    }

}

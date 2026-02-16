package dev.funixgaming.margueritel.portfolio.api.auth.service.configs;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "app.secrets")
public class SecretsConfiguration {

    private String jwtSecret;

}

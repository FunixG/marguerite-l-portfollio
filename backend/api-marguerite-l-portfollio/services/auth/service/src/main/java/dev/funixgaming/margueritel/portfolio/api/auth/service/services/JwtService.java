package dev.funixgaming.margueritel.portfolio.api.auth.service.services;

import dev.funixgaming.margueritel.portfolio.api.auth.service.configs.SecretsConfiguration;
import dev.funixgaming.spring.core.exceptions.ApiException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

@Service
public class JwtService {

    private final SecretKey jwtSecretKey;

    public JwtService(SecretsConfiguration secretsConfiguration) {
        this.jwtSecretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretsConfiguration.getJwtSecret()));
    }

    public String generateToken() {
        final Date expirationDate = Date.from(Instant.now().plusSeconds(604800));

        try {
            return io.jsonwebtoken.Jwts.builder()
                    .subject("auth-token-margueritel-api")
                    .expiration(expirationDate)
                    .signWith(this.jwtSecretKey)
                    .issuedAt(new Date())
                    .compact();
        } catch (Exception e) {
            throw new ApiException("Erreur lors de la génération du token JWT.", e);
        }
    }

    public boolean isTokenValid(String token) {
        try {
            final JwtParser parser = Jwts.parser()
                    .keyLocator(_ -> this.jwtSecretKey)
                    .build();

            parser.parse(token);
            return true;
        } catch (Exception _) {
            return false;
        }
    }

}

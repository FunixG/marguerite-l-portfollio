package dev.funixgaming.margueritel.portfolio.api.auth.service.services;

import dev.funixgaming.spring.core.exceptions.ApiBadRequestException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.util.Scanner;

@Service
public class PasswordService implements AuthenticationManager {

    private final PasswordEncoder passwordEncoder;
    private String passwordEncoded = "";

    public PasswordService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
        this.readPasswordFromFile();
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        final Object credentials = authentication.getCredentials();

        if (!(credentials instanceof final String rawPassword)) {
            throw new ApiBadRequestException("Le mot de passe est requis.");
        }

        if (this.matches(rawPassword)) {
            return authentication;
        } else {
            throw new ApiBadRequestException("Mot de passe incorrect.");
        }
    }

    public void setPassword(String password) {
        this.passwordEncoded = passwordEncoder.encode(password);
        this.writePasswordToFile();
    }

    private boolean matches(String rawPassword) {
        if (this.passwordEncoded.isEmpty()) {
            return true;
        }

        return passwordEncoder.matches(rawPassword, this.passwordEncoded);
    }

    private void readPasswordFromFile() {
        final File file = new File("password.txt");

        if (file.exists()) {
            try (final Scanner scanner = new Scanner(file)) {
                if (scanner.hasNextLine()) {
                    this.passwordEncoded = scanner.nextLine();
                } else {
                    this.passwordEncoded = "";
                }
            } catch (Exception _) {
                this.passwordEncoded = "";
            }
        }
    }

    private void writePasswordToFile() {
        final File file = new File("password.txt");

        try (final FileWriter writer = new FileWriter(file, false)) {
            writer.write(this.passwordEncoded);
        } catch (Exception _) {
        }
    }

}

package dev.funixgaming.margueritel.portfolio.api.auth.service.resources;

import dev.funixgaming.margueritel.portfolio.api.auth.api.dtos.TokenDTO;import dev.funixgaming.margueritel.portfolio.api.auth.service.services.JwtService;
import dev.funixgaming.margueritel.portfolio.api.auth.service.services.PasswordService;
import dev.funixgaming.margueritel.portfolio.api.auth.api.dtos.PasswordRequestDTO;
import dev.funixgaming.spring.core.exceptions.ApiBadRequestException;
import dev.funixgaming.spring.core.exceptions.ApiException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthResource {

    private final PasswordService passwordService;
    private final JwtService jwtService;

    /**
     * Login endpoint, returns a JWT token if the credentials are correct
     * @return JWT token
     */
    @PostMapping("login")
    public TokenDTO login(@RequestBody @Valid @NotBlank(message = "Le mot de passe est requis") String password) throws ApiException {
        this.passwordService.authenticate(new UsernamePasswordAuthenticationToken(null, password));
        return new TokenDTO(this.jwtService.generateToken());
    }

    /**
     * Endpoint to set the password for the first time, or to reset it if the user forgot it
     * @param request the request containing the old password, the new password and the confirmation of the new password
     */
    @PostMapping("setPassword")
    public void setPassword(@RequestBody @Valid PasswordRequestDTO request) throws ApiException {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new ApiBadRequestException("Le nouveau mot de passe et la confirmation ne correspondent pas.");
        }

        this.passwordService.authenticate(new UsernamePasswordAuthenticationToken(null, request.getOldPassword()));
        this.passwordService.setPassword(request.getNewPassword());
    }

}

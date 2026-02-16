package dev.funixgaming.margueritel.portfollio.api.auth.api.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordRequestDTO {

    @NotBlank(message = "L'ancien mot de passe ne peut pas être vide")
    private String oldPassword;

    @NotBlank(message = "Le nouveau mot de passe ne peut pas être vide")
    private String newPassword;

    @NotBlank(message = "La confirmation du mot de passe ne peut pas être vide")
    private String confirmPassword;

}

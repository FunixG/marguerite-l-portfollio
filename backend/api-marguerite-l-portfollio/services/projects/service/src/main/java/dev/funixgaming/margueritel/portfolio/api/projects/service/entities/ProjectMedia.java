package dev.funixgaming.margueritel.portfolio.api.projects.service.entities;

import dev.funixgaming.margueritel.portfolio.api.projects.api.enums.ProjectMediaType;
import dev.funixgaming.spring.core.storage.entities.ApiStorageFile;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "projects_media")
public class ProjectMedia extends ApiStorageFile {

    @Column(nullable = false, name = "media_description")
    private String mediaDescription;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "media_type")
    private ProjectMediaType mediaType;

}

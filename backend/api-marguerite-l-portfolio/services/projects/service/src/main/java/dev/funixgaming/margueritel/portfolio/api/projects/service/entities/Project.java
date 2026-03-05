package dev.funixgaming.margueritel.portfolio.api.projects.service.entities;

import dev.funixgaming.spring.core.crud.entities.ApiEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity(name = "projects")
public class Project extends ApiEntity {

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false, unique = true)
    private String path;

    @Column(nullable = false, name = "is_visible")
    private Boolean isVisible;

    @Column(nullable = false, name = "html_code", columnDefinition = "TEXT")
    private String htmlCode;

    @Column(nullable = false, name = "json_code", columnDefinition = "TEXT")
    private String jsonCode;

    @Column(nullable = false, name = "cover_media_id")
    private String coverMediaId;

}

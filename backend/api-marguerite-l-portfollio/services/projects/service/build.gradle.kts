plugins {
    id("buildlogic.java-conventions")
    id("dev.funixgaming.spring.conventions.service") version libs.versions.dev.funixgaming.spring.core
    id("dev.funixgaming.spring.conventions.postgres") version libs.versions.dev.funixgaming.spring.core
}

group = "dev.funixgaming.margueritel.portfolio.api.projects.service"
description = "marguerite-l-protfollio-api-projects-service"
version = "1.0.0"

dependencies {
    implementation(libs.dev.funixgaming.core.storage)
    implementation(project(":services:auth:api"))
    implementation(project(":services:projects:api"))
}

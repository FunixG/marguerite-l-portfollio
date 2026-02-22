import org.springframework.boot.gradle.tasks.bundling.BootJar

plugins {
    id("buildlogic.java-conventions")
    id("dev.funixgaming.spring.conventions.auth") version libs.versions.dev.funixgaming.spring.core
}

group = "dev.funixgaming.margueritel.portfolio.api.auth.api"
description = "marguerite-l-protfollio-api-auth-api"
version = "1.0.0"

dependencies {
    implementation(libs.dev.funixgaming.core.crud)
}

tasks.getByName<BootJar>("bootJar") {
    enabled = false
}
tasks.getByName<Jar>("jar") {
    enabled = true
    archiveClassifier.set("")
}
plugins {
    id("buildlogic.java-conventions")
    id("dev.funixgaming.spring.conventions.service") version libs.versions.dev.funixgaming.spring.core
}

group = "dev.funixgaming.margueritel.portfolio.api.auth"
description = "marguerite-l-protfollio-api-auth"

dependencies {
    implementation(libs.dev.funixgaming.core.crud)
}
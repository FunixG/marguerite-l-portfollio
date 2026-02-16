plugins {
    id("buildlogic.java-conventions")
    id("dev.funixgaming.spring.conventions.auth") version libs.versions.dev.funixgaming.spring.core
}

group = "dev.funixgaming.margueritel.portfolio.api.auth.api"
description = "marguerite-l-protfollio-api-auth-api"

dependencies {
    implementation(libs.dev.funixgaming.core.crud)
}

pluginManagement {
    includeBuild("build-logic")

    repositories {
        gradlePluginPortal()
        mavenCentral()
        mavenLocal()
        maven {
            url = uri("https://maven.pkg.github.com/FunixG/spring-boot-crud-lib")
            credentials {
                username = System.getenv("GITHUB_AUTH_USERNAME")
                password = System.getenv("GITHUB_AUTH_TOKEN")
            }
        }
    }
}

rootProject.name = "api-marguerite-l-portfollio"

include(":services:auth")
include(":services:projects")


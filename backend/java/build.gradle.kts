plugins {
    id("org.springframework.boot") version "2.7.18"
    id("io.spring.dependency-management") version "1.0.15.RELEASE"
    java
}

group = "com.greenreach"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_17

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.xerial:sqlite-jdbc:3.45.1.0")
    implementation("com.github.gwenn:sqlite-dialect:0.1.2")
    implementation("org.eclipse.paho:org.eclipse.paho.client.mqttv3:1.2.5")

testImplementation("org.springframework.boot:spring-boot-starter-test") {
    exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    exclude(group = "org.junit.jupiter", module = "junit-jupiter")
}

testImplementation("org.junit.jupiter:junit-jupiter-api:5.8.2")
testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:5.8.2")
testImplementation("org.mockito:mockito-core:5.12.0")

}



tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<org.springframework.boot.gradle.tasks.bundling.BootJar> {
    mainClass.set("com.greenreach.Application")
}

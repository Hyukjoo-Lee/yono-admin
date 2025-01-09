package com.yono.config;

import java.io.File;
import java.io.FileNotFoundException;

import org.springframework.context.annotation.Configuration;
import org.springframework.util.ResourceUtils;

import io.github.cdimascio.dotenv.Dotenv;

@Configuration
public class DotenvConfig {
    static {
        try {
            File resourceDirectory = ResourceUtils.getFile("classpath:");
            Dotenv dotenv = Dotenv.configure()
                    // .directory(System.getProperty("user.dir") +
                    // "/app-backend/src/main/resources")
                    .directory(resourceDirectory.getPath())
                    .load();

            dotenv.entries().forEach(entry -> {
                System.setProperty(entry.getKey(), entry.getValue());
            });
        } catch (FileNotFoundException e) {
            throw new RuntimeException(".env 파일 경로 에러", e);
        }
    }

    
}
package com.yono.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${IMAGE_PATH}")
    private String uploadDir;

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        String fullPath = uploadDir + "/uploads/images/";

        try {
            registry.addResourceHandler("/uploads/images/**")
            .addResourceLocations("file:" + fullPath);

        } catch (Exception e) {
            throw new RuntimeException("사진 파일 경로 에러", e);
        }
    }
}

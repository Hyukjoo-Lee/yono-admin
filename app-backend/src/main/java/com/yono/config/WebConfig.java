package com.yono.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
        String uploadDir = System.getProperty("user.dir").replace("\\app-backend", "").replace("/app-backend", "") + "/uploads/images/";

        try {
            registry.addResourceHandler("/uploads/images/**")
                    .addResourceLocations("file:" + uploadDir);

        } catch (Exception e) {
            throw new RuntimeException("사진 파일 경로 에러", e);
        }
    }
}

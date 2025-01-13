package com.yono.config;

import java.io.File;
import java.io.FileNotFoundException;

import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.util.ResourceUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {

        try {
            File resourceDirectory = ResourceUtils.getFile("classpath:");
    
            registry.addResourceHandler("/images/**")
                    .addResourceLocations("file:" + resourceDirectory.getPath() + "/static/images/");

        } catch (FileNotFoundException e) {
            throw new RuntimeException("사진 파일 경로 에러", e);
        }
    }
}

package com.yono.controller;

import java.io.IOException;
import java.io.File;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.yono.service.NoticeService;
import com.yono.vo.NoticeVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("/list")
    public List<NoticeVO> searchNotice(@RequestParam("keyword") String keyword) {
        return noticeService.searchNotice(keyword);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteByNotice(@RequestBody List<Integer> ids) {
        noticeService.deleteByNotice(ids);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/write")
    public ResponseEntity<Void> saveNotice(@ModelAttribute NoticeVO noticeVO,
            @RequestParam("file") MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            String fileName = saveFile(file);  // 파일 저장 후 경로 반환
            noticeVO.setAdminId("adminId");      // 관리자 아이디
            noticeVO.setImgurl(fileName);      // 공지사항에 이미지 경로 설정
        }
        noticeService.saveNotice(noticeVO);     // 공지사항 저장
        return ResponseEntity.ok().build();
    }

    private String saveFile(MultipartFile file) throws IOException {
        // 애플리케이션 루트 디렉토리의 "resources" 폴더에 저장
        String uploadFolder = System.getProperty("user.dir") + "/app-backend/src/main/resources/static/images"; // 실행 디렉토리 경로

        // 현재 날짜로 디렉토리 생성
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int date = cal.get(Calendar.DATE);
        String homedir = uploadFolder + "/" + year + month + date;

        // 디렉토리가 없으면 생성
        File path = new File(homedir);
        if (!path.exists()) {
            path.mkdirs();  // 디렉토리 생성
        }

        // 업로드된 파일의 원본 파일명
        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            fileName = "default_filename.jpg";  // 기본 파일명 설정
        }

        // DB에 저장될 파일 경로 형식
        String fileDBName = "/images/" + year + month + date + "/" + fileName;

        // 실제 저장할 경로
        File saveFile = new File(homedir + "/" + fileName);
        log.info("파일 저장 경로: " + saveFile.getAbsolutePath());

        try {
            file.transferTo(saveFile);  // 파일 저장
        } catch (Exception e) {
            log.error("파일 저장 중 오류 발생", e);
        }

        return fileDBName;  // DB에 저장할 경로 반환
    }

}

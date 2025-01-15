package com.yono.controller;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;
import java.util.Random;

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
        for (Integer id : ids) {
            NoticeVO notice = noticeService.getNoticeById(id);
            if (notice != null && notice.getImgurl() != null) {
                // 이미지 파일 삭제제
                String filePath = System.getProperty("user.dir") + notice.getImgurl();
                File file = new File(filePath);
                if (file.exists()) {
                    if (file.delete()) {
                        log.info("Deleted image file: " + filePath);
                    } else {
                        log.warn("Failed to delete image file: " + filePath);
                    }
                }
            }
        }

        noticeService.deleteByNotice(ids);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/write")
    public ResponseEntity<Void> saveNotice(@ModelAttribute NoticeVO noticeVO,
            @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

        if (file != null && !file.isEmpty()) {
            String fileName = saveFile(file);  // 파일 저장 후 경로 반환
            noticeVO.setImgurl(fileName);      // 공지사항에 이미지 경로 설정
        }
        noticeVO.setUpdatedAt(null);
        noticeVO.setAdminId("adminId");  // 관리자 아이디
        noticeService.saveNotice(noticeVO);     // 공지사항 저장
        return ResponseEntity.ok().build();
    }

    private String saveFile(MultipartFile file) throws IOException {
        String uploadFolder = System.getProperty("user.dir") + "/uploads/images";

        // 현재 날짜로 디렉토리 생성
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int date = cal.get(Calendar.DATE);
        String homedir = uploadFolder + "/" + year + "-" + month + "-" + date;

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

        Random r = new Random();
        int random = r.nextInt(100000000);
        int index = fileName.lastIndexOf(".");
        String fileExtension = fileName.substring(index + 1);
        String dataFileName = fileName.substring(0, fileName.length() - fileExtension.length() - 1);
        String newFileName = dataFileName + year + month + date + random + "." + fileExtension;
        // DB에 저장될 파일 경로 형식
        String fileDBName = "/uploads/images/" + year + "-" + month + "-" + date + "/" + newFileName;

        // 실제 저장할 경로
        File saveFile = new File(homedir + "/" + newFileName);
        log.info("파일 저장 경로: " + saveFile.getAbsolutePath());

        try {
            file.transferTo(saveFile);  // 파일 저장
        } catch (Exception e) {
            e.printStackTrace();
        }

        return fileDBName;  // DB에 저장할 경로 반환
    }

    @GetMapping("/detail")
    public ResponseEntity<NoticeVO> getNoticeDetail(@RequestParam("id") int id) {
        NoticeVO notice = noticeService.getNoticeById(id);
        if (notice != null) {
            return ResponseEntity.ok(notice);  // 공지사항이 있으면 반환
        } else {
            return ResponseEntity.notFound().build();  // 공지사항이 없으면 404 반환
        }
    }

    @PostMapping("/edit")
    public ResponseEntity<Void> editNotice(
            @RequestParam("id") int id, // 수정할 공지사항 ID
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "imgurl", required = false) String imgurl) throws IOException {

        // 기존 공지사항 조회
        NoticeVO existingNotice = noticeService.getNoticeById(id);
        if (existingNotice == null) {
            return ResponseEntity.notFound().build(); // 수정 대상 없음
        }

        existingNotice.setTitle(title);
        existingNotice.setContent(content);

        if (file != null && !file.isEmpty()) {
            if ("deleted".equals(imgurl)) {
                // 클라이언트가 이미지 삭제 요청 시
                deleteFile(existingNotice.getImgurl());
                existingNotice.setImgurl(null); // 이미지 경로를 null로 설정
            }
            String fileName = saveFile(file); // 새 파일 저장
            existingNotice.setImgurl(fileName); // 새 이미지 경로 저장
        } else if (imgurl != null && imgurl.isEmpty()) {
            existingNotice.setImgurl(null); // 이미지 삭제 요청 처리
        } else if ("deleted".equals(imgurl)) {
            // 클라이언트가 이미지 삭제 요청 시
            deleteFile(existingNotice.getImgurl());
            existingNotice.setImgurl(null); // 이미지 경로를 null로 설정
        }

        // 공지사항 저장
        noticeService.saveNotice(existingNotice);
        return ResponseEntity.ok().build();
    }

    private void deleteFile(String filePath) {
        if (filePath == null || filePath.isEmpty()) {
            return; // 경로가 없는 경우 아무것도 하지 않음
        }
        String absolutePath = System.getProperty("user.dir") + filePath; // 절대 경로 생성
        File file = new File(absolutePath);
        if (file.exists()) {
            if (file.delete()) {
                log.info("Deleted file: " + absolutePath);
            } else {
                log.warn("Failed to delete file: " + absolutePath);
            }
        } else {
            log.warn("File does not exist: " + absolutePath);
        }
    }

}

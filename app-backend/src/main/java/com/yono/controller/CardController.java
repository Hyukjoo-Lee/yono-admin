package com.yono.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yono.dto.CardDTO;
import com.yono.service.CardService;

@RestController
@RequestMapping("/card")
public class CardController {

    @Autowired
    private CardService cardService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/list")
    public List<CardDTO> searchNotice(@RequestParam("keyword") String keyword) {
        return cardService.searchNotice(keyword);
    }

    // 카드 생성 API
    @PostMapping("/create")
    public ResponseEntity<CardDTO> createCard(
            @RequestParam("cardInfo") String cardInfoJson,
            @RequestParam(value = "files", required = false) List<MultipartFile> files) throws IOException {

        CardDTO cardDTO = objectMapper.readValue(cardInfoJson, CardDTO.class);

        System.out.println("cardDTO: " + cardDTO);
        System.out.println("files: " + files);

        List<String> filePaths = new ArrayList<>();

        if (files != null && !files.isEmpty()) {
            for (MultipartFile file : files) {
                String fileName = saveFile(file, cardDTO.getCardProvider());
                filePaths.add(fileName);
            }

            cardDTO.setCardImgUrl(String.join(",", filePaths));
        }

        CardDTO createdCard = cardService.createCard(cardDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCard);
    }

    // 이미지 파일 저장
    private String saveFile(MultipartFile file, String cardProvider) throws IOException {

        String propertyPath = System.getProperty("user.dir").replace("\\app-backend", "").replace("/app-backend", "");
        String uploadBaseFolder = propertyPath + "/uploads/images/card/" + cardProvider;

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null || originalFileName.isEmpty()) {
            return "/uploads/images/default-card.png";
        }

        int index = originalFileName.lastIndexOf(".");
        String fileExtension = (index > 0) ? originalFileName.substring(index) : "";
        String baseFileName = originalFileName.substring(0, index);

        String subFolder = extractFolderName(baseFileName);

        String uploadFolder = uploadBaseFolder + "/" + subFolder;
        File path = new File(uploadFolder);

        if (!path.exists()) {
            path.mkdirs();
        }

        File saveFile = new File(uploadFolder, originalFileName);

        int count = 1;

        while (saveFile.exists()) {
            String newFileName = baseFileName + "-" + count + fileExtension;
            saveFile = new File(uploadFolder, newFileName);
            count++;
        }

        try {
            file.transferTo(saveFile);
        } catch (IOException e) {
            throw new RuntimeException("파일 저장 중 오류 발생: " + e.getMessage());
        }

        return "/uploads/images/card/" + cardProvider + "/" + subFolder + "/" + saveFile.getName();
    }

    /**
     * 파일명 맨끝에서 부터 시작하여 숫자가 아닌 문자를 만날 때까지 부분을 폴더명으로 추출
     * 예) kb-my123123.png => kb-my
     */
    private String extractFolderName(String fileName) {

        int lastIndex = fileName.length();

        for (int i = fileName.length() - 1; i >= 0; i--) {
            if (!Character.isDigit(fileName.charAt(i))) {
                // 맨 끝 인덱스 이동
                lastIndex = i + 1;
                break;
            }
        }
        // 파일 이름 자르기
        return fileName.substring(0, lastIndex);
    }

}

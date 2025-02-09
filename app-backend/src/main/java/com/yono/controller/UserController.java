package com.yono.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.yono.dto.UserDTO;
import com.yono.service.UserService;


/**
 * 회원관리 처리하는 컨트롤러 클래스
 */
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * 사용자 검색 API
     *
     * @param keyword     검색어 (이름 또는 아이디)
     * @param selectValue 검색 기준 (전체, 이름, 아이디)
     * @return 검색된 사용자 목록
     */
    @GetMapping("/list")
    public List<UserDTO> searchUsers(@RequestParam("keyword") String keyword, @RequestParam("selectValue") String selectValue) {
        switch (selectValue) {
            case "전체":
                return userService.searchUsers(keyword);
            case "이름":
                return userService.searchUsersByName(keyword);
            case "아이디":
                return userService.searchUsersById(keyword);
            default:
                return userService.searchUsers(keyword);
        }
    }

    /**
     * 사용자 상태 변경 API (삭제 상태로 변경)
     *
     * @param userNum 사용자 번호
     * @param state   변경할 상태값
     * @return 성공 여부 응답
     */
    @PutMapping("/delete")
    public ResponseEntity<String> delUserState(@RequestParam("userNum") int userNum, @RequestParam("state") String state) {
        int result = userService.delUserState(userNum, state);
        if (result > 0) {
            return ResponseEntity.ok("Success");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }   
}

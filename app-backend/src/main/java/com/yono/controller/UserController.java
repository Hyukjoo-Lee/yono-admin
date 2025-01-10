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

import com.yono.service.UserService;
import com.yono.vo.UserVO;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/list")
    public List<UserVO> searchUsers(@RequestParam("keyword") String keyword, @RequestParam("selectValue") String selectValue) {
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

    @PutMapping("/delete")
    public ResponseEntity<String> delUserState(@RequestParam("userNum") int userNum, @RequestParam("state") int state) {
        int result = userService.delUserState(userNum, state);
        if (result > 0) {
            return ResponseEntity.ok("Success");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }   
}

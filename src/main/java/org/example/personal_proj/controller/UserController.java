package org.example.personal_proj.controller;


import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.personal_proj.dto.CustomUserDetails;
import org.example.personal_proj.dto.UserDto;
import org.example.personal_proj.entity.UserEntity;
import org.example.personal_proj.jwt.JWTUtil;
import org.example.personal_proj.repository.UserRepository;
import org.example.personal_proj.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody UserDto dto) {

        userService.register(dto);

        return "ok";
    }
    @GetMapping("/info")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserDto> getUserInfo(HttpServletRequest request) {
        String token = request.getHeader("Authorization").substring(7);
        String username = jwtUtil.getUsername(token);

        UserEntity userEntity = userRepository.findByUsername(username)
                .orElseThrow(()-> new RuntimeException("User not found"));

        UserDto dto = UserDto.builder()
                .idx(userEntity.getIdx())
                .email(userEntity.getUserEmail())
                .nickname(userEntity.getUserNickname())
                .build();

        return ResponseEntity.ok(dto);

    }



    }
//
//    @GetMapping("/checkSession")
//    public ResponseEntity<?> checkUserSession(HttpServletRequest request) {
//        HttpSession session = request.getSession(false); // Get the current session without creating a new one
//        if (session != null && session.getAttribute("user") != null) {
//            String username = (String) session.getAttribute("user");// Fetch the username from the session
//
//            return ResponseEntity.ok().body("User is logged in: " + username);
//
//        } else {
//            return ResponseEntity.ok().body("No user is logged in.");
//        }
//    }
//
//    @PostMapping("/logout")
//    public String logout(HttpServletRequest request) {
//        HttpSession session = request.getSession(false); // Get the existing session
//        if (session != null) {
//            session.invalidate(); // Invalidate the session
//        }
//        return "Logout successful";
//    }
//







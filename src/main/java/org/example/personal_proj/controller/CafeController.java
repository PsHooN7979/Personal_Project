package org.example.personal_proj.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.personal_proj.dto.CafeDto;
import org.example.personal_proj.jwt.JWTUtil;
import org.example.personal_proj.repository.CafeRepository;
import org.example.personal_proj.service.CafeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:3000")
public class CafeController {

    private final CafeService cafeService;
    private final CafeRepository cafeRepository;
    private final JWTUtil jwtUtil;

    @PostMapping("/registercafe")
    public ResponseEntity<CafeDto> registerCafe(@RequestBody CafeDto dto) {
        try {
            CafeDto registeredCafe = cafeService.registerCafe(dto);
            return ResponseEntity.ok(registeredCafe);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @GetMapping("/cafelist")
    public ResponseEntity<List<CafeDto>> getAllCafes() {
        List<CafeDto> cafes = cafeService.getAllCafes();
        return ResponseEntity.ok(cafes);
    }







}

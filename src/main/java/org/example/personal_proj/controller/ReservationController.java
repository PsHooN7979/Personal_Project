package org.example.personal_proj.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.personal_proj.dto.CafeReservationDto;
import org.example.personal_proj.dto.UserReservationDto;
import org.example.personal_proj.entity.CafeReservationEntity;
import org.example.personal_proj.service.CafeReservationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("user")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    private final CafeReservationService cafeReservationService;

    @PostMapping("/reservation")
    public ResponseEntity<CafeReservationDto> cafeReservation(@RequestBody CafeReservationDto dto) {
        try {
            CafeReservationDto reservation = cafeReservationService.cafeReservation(dto);
            return ResponseEntity.ok(reservation);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/reservation-list")
    public ResponseEntity<List<UserReservationDto>> reservationList(@RequestParam Long idx){
        try {
            List<UserReservationDto> reservations = cafeReservationService.getUserReservations(idx);
            return ResponseEntity.ok(reservations);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}

package org.example.personal_proj.service;

import lombok.RequiredArgsConstructor;
import org.example.personal_proj.dto.CafeReservationDto;
import org.example.personal_proj.dto.UserReservationDto;
import org.example.personal_proj.entity.CafeEntity;
import org.example.personal_proj.entity.CafeReservationEntity;
import org.example.personal_proj.entity.UserEntity;
import org.example.personal_proj.repository.CafeRepository;
import org.example.personal_proj.repository.CafeReservationRepository;
import org.example.personal_proj.repository.TableSeatRepository;
import org.example.personal_proj.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CafeReservationService {

    private final CafeReservationRepository cafeReservationRepository;

    private final CafeRepository cafeRepository;

    private final UserRepository userRepository;

    private final TableSeatRepository tableSeatRepository;


    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");


    public CafeReservationDto cafeReservation(CafeReservationDto dto) {
        UserEntity user = userRepository.findById(dto.getUserIdx())
                .orElseThrow(() -> new RuntimeException("User not found"));

        CafeEntity cafe = cafeRepository.findById(dto.getCafeIdx())
                .orElseThrow(() -> new RuntimeException("Cafe not found"));

        if (cafe.getTableCount().getTableNum() > 0) {

            cafe.getTableCount().setTableNum(cafe.getTableCount().getTableNum() - 1);
            tableSeatRepository.save(cafe.getTableCount());

            CafeReservationEntity reservation = CafeReservationEntity.builder()
                    .startDate(LocalTime.parse(dto.getStartDate(), timeFormatter))
                    .endDate(LocalTime.parse(dto.getEndDate(), timeFormatter))
                    .user(user)
                    .cafe(cafe)
                    .build();
            return entityToDto(cafeReservationRepository.save(reservation));
        } else {
            throw new IllegalStateException("No tables available for reservation");
        }


    }

    private CafeReservationDto entityToDto(CafeReservationEntity entity) {
        return CafeReservationDto.builder()
                .startDate(entity.getStartDate().format(timeFormatter))
                .endDate(entity.getEndDate().format(timeFormatter))
                .userIdx(entity.getUser().getIdx())
                .cafeIdx(entity.getCafe().getIdx())
                .build();
    }

    public List<UserReservationDto> getUserReservations(Long idx) {
        List<CafeReservationEntity> reservations = cafeReservationRepository.findAllReservation(idx);
        return reservations.stream()
                .map(this::reservationEntityToDto)
                .collect(Collectors.toList());
    }

    private UserReservationDto reservationEntityToDto(CafeReservationEntity entity) {
        return UserReservationDto.builder()
                .startDate(entity.getStartDate().format(timeFormatter))
                .endDate(entity.getEndDate().format(timeFormatter))
                .cafeName(entity.getCafe().getName())
                .cafeAddress(entity.getCafe().getAddress())
                .idx(entity.getIdx())
                .build();
    }


}

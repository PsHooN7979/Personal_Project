package org.example.personal_proj.service;

import lombok.RequiredArgsConstructor;
import org.example.personal_proj.dto.CafeDto;
import org.example.personal_proj.entity.CafeEntity;
import org.example.personal_proj.entity.TableSeatEntity;
import org.example.personal_proj.entity.UserEntity;
import org.example.personal_proj.repository.CafeRepository;
import org.example.personal_proj.repository.TableSeatRepository;
import org.example.personal_proj.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CafeService {

    private final CafeRepository cafeRepository;

    private final UserRepository userRepository;

    private final TableSeatRepository tableSeatRepository;
    private final DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm");

    public CafeDto registerCafe(CafeDto dto) {
        UserEntity owner = userRepository.findById(dto.getOwner())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + dto.getOwner()));

        TableSeatEntity tableSeat = tableSeatRepository.save(new TableSeatEntity(null, dto.getTableNum(), new ArrayList<>()));

        CafeEntity cafeEntity = CafeEntity.builder()
                .name(dto.getName())
                .address(dto.getAddress())
                .openTime(LocalTime.parse(dto.getOpenTime(), timeFormatter))
                .closeTime(LocalTime.parse(dto.getCloseTime(), timeFormatter))
                .owner(owner)
                .tableCount(tableSeat)
                .build();
        return entityToDto(cafeRepository.save(cafeEntity));
    }

    private CafeDto entityToDto(CafeEntity entity) {
        return CafeDto.builder()
                .name(entity.getName())
                .address(entity.getAddress())
                .openTime(entity.getOpenTime().format(timeFormatter))
                .closeTime(entity.getCloseTime().format(timeFormatter))
                .owner(entity.getOwner().getIdx())
                .tableNum(entity.getTableCount().getTableNum())
                .build();
    }


    public List<CafeDto> getAllCafes() {
        List<CafeEntity> cafes = cafeRepository.findAll();
        return cafes.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CafeDto convertToDto(CafeEntity entity) {
        return CafeDto.builder()
                .idx(entity.getIdx())
                .name(entity.getName())
                .address(entity.getAddress())
                .openTime(entity.getOpenTime().format(timeFormatter))
                .closeTime(entity.getCloseTime().format(timeFormatter))
                .owner(entity.getOwner().getIdx())
                .tableNum(entity.getTableCount().getTableNum())
                .build();
    }




}

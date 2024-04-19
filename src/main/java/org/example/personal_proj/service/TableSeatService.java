package org.example.personal_proj.service;

import lombok.RequiredArgsConstructor;
import org.example.personal_proj.dto.TableSeatDto;
import org.example.personal_proj.entity.CafeEntity;
import org.example.personal_proj.entity.TableSeatEntity;
import org.example.personal_proj.repository.CafeRepository;
import org.example.personal_proj.repository.TableSeatRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TableSeatService {

    private final TableSeatRepository tableSeatRepository;


}

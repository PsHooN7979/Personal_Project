package org.example.personal_proj.service;

import lombok.RequiredArgsConstructor;
import org.example.personal_proj.repository.MenuRepository;
import org.example.personal_proj.repository.TableSeatRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MenuService {

    private final MenuRepository menuRepository;
}

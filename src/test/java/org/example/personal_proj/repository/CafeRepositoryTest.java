package org.example.personal_proj.repository;

import org.example.personal_proj.entity.CafeEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

@SpringBootTest
public class CafeRepositoryTest {

    @Autowired
    CafeRepository cafeRepository;


    @Test
    void findByOwner() {
        cafeRepository.findByOwnerIdx(2L);
    }
}


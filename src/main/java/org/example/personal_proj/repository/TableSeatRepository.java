package org.example.personal_proj.repository;

import org.example.personal_proj.entity.TableSeatEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TableSeatRepository extends JpaRepository<TableSeatEntity, Long> {
    Optional<TableSeatEntity> findByTableNum(Integer tableNum);
}

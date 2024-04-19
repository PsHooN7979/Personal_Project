package org.example.personal_proj.repository;

import org.example.personal_proj.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {


    Boolean existsByUsername(String username);

    Optional<UserEntity> findByUsername(String username);
}

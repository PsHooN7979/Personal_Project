package org.example.personal_proj.service;

import lombok.RequiredArgsConstructor;
import org.example.personal_proj.dto.UserDto;
import org.example.personal_proj.entity.UserEntity;
import org.example.personal_proj.jwt.JWTUtil;
import org.example.personal_proj.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;


    public void register(UserDto dto) {

        String username = dto.getUsername();
        String password = dto.getPassword();
        String email = dto.getEmail();
        String nickname = dto.getNickname();

        Boolean isExist = userRepository.existsByUsername(username);

        if (isExist) {

            return;
        }

        UserEntity userEntity = UserEntity.builder()
                .username(dto.getUsername())
                .userPassword(passwordEncoder.encode(dto.getPassword()))
                .userEmail(dto.getEmail())
                .userNickname(dto.getNickname())
                .role("USER")
                .build();

        userRepository.save(userEntity);
    }







}

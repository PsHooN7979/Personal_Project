package org.example.personal_proj.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
@Table(name = "user_t")
public class UserEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String userPassword;

    @Column(nullable = false, unique = true)
    private String userEmail;

    @Column(nullable = false, unique = true)
    private String userNickname;

    @Column(nullable = false)
    private String role;


    @ToString.Exclude
    @OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<CafeReservationEntity> reservation = new ArrayList<>();

    @ToString.Exclude
    @OneToMany(mappedBy = "owner", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<CafeEntity> owner = new ArrayList<>();



}

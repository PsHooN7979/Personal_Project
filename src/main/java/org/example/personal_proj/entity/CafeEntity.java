package org.example.personal_proj.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
@Table(name = "cafe_t")
public class CafeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private LocalTime openTime;

    @Column(nullable = false)
    private LocalTime closeTime;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "user_t_idx", referencedColumnName = "idx")
    private UserEntity owner;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "table_seat_t_idx")
    private TableSeatEntity tableCount;



    @ToString.Exclude
    @OneToMany(mappedBy = "cafeMenu", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<MenuEntity> menu = new ArrayList<>();



    @ToString.Exclude
    @OneToMany(mappedBy = "cafe", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<CafeReservationEntity> cafe = new ArrayList<>();
}

package org.example.personal_proj.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
@Table(name = "table_seat_t")
public class TableSeatEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idx;

    @Column(nullable = false)
    private Integer tableNum;

    @ToString.Exclude
    @OneToMany(mappedBy = "tableCount", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<CafeEntity> tableCount = new ArrayList<>();

}

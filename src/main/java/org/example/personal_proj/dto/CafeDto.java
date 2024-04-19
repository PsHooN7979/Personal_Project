package org.example.personal_proj.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CafeDto {
    private Long idx;
    private String name;
    private String address;
    private String openTime;
    private String closeTime;
    private Long owner;
    private Integer tableNum;
}

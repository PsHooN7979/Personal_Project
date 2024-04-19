package org.example.personal_proj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CafeReservationDto {

    private String startDate;
    private String endDate;
    private Long userIdx;
    private Long cafeIdx;


}

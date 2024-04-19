package org.example.personal_proj.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserReservationDto {

    private Long idx;
    private String startDate;
    private String endDate;
    private String cafeName;
    private String cafeAddress;
}

package org.example.personal_proj.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TableSeatDto {
    private Integer tableNum;
    private Long owner;
}

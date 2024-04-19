package org.example.personal_proj.dto;


import lombok.*;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private Long idx;
    private String username;
    private String password;
    private String email;
    private String nickname;
    private String role;
}

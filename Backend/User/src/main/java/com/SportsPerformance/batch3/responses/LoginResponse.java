package com.SportsPerformance.batch3.responses;
import com.SportsPerformance.batch3.entities.Roles;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private Roles role;
}

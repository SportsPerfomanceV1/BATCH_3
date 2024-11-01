package com.SportsPerformance.batch3.repositories;
import com.SportsPerformance.batch3.entities.Role;
import com.SportsPerformance.batch3.entities.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByName(Roles name);
}

package com.SportsPerformance.batch3.bootstrap;
import com.SportsPerformance.batch3.entities.Role;
import com.SportsPerformance.batch3.entities.Roles;
import com.SportsPerformance.batch3.repositories.RoleRepository;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.ContextRefreshedEvent;

import java.util.Arrays;
import java.util.Optional;

@Configuration
public class RoleSeeder implements ApplicationListener<ContextRefreshedEvent> {

    private final RoleRepository roleRepository;

    public RoleSeeder(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        this.loadRoles();
    }

    private void loadRoles() {
        Roles[] roleNames = new Roles[]{Roles.ATHLETE, Roles.COACH, Roles.ADMIN};
        Arrays.stream(roleNames).forEach((roleName) -> {
            Optional<Role> optionalRole = roleRepository.findByName(roleName);

            optionalRole.ifPresentOrElse(System.out::println, ()-> {
                Role roleToCreate = new Role();
                roleToCreate.setName(roleName);
                roleRepository.save(roleToCreate);
            }

            );
        });
    }
}

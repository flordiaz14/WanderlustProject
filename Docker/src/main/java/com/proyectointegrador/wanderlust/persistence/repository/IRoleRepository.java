package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.persistence.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
    Role findRoleByName(String name);
}
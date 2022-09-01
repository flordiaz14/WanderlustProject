package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.persistence.entities.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICityRepository extends JpaRepository<City, Long> {
}

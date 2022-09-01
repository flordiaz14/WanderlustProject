package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.persistence.entities.Feature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IFeatureRepository extends JpaRepository<Feature, Long> {
}

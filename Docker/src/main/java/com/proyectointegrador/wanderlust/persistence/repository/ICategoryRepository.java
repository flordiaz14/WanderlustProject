package com.proyectointegrador.wanderlust.persistence.repository;


import com.proyectointegrador.wanderlust.persistence.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICategoryRepository extends JpaRepository<Category, Long> {
}

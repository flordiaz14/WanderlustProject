package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.persistence.entities.Booking;

import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IBookingRepository extends JpaRepository<Booking, Long> {

    @Query("select b from Booking b where b.product = ?1")
    Set<Booking> findByProductId(Product product);

    @Query("select b from Booking b where b.user = ?1")
    Set<Booking> findByUserId(User user);



}

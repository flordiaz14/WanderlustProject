package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.model.BookingAvailabilityDto;
import com.proyectointegrador.wanderlust.persistence.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface IBookingAvailability extends JpaRepository<BookingAvailabilityDto, Long> {
    @Query(value = "{call availableById_print(:id)}", nativeQuery = true)
    public List<BookingAvailabilityDto> availableById(@Param("id") Long id);

}


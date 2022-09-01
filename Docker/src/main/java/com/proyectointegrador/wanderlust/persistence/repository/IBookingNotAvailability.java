package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.model.BookingAvailabilityDto;
import com.proyectointegrador.wanderlust.model.BookingNotAvailabilityDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IBookingNotAvailability extends JpaRepository<BookingNotAvailabilityDto, Long> {
    @Query(value = "{call dates_not_available(:id)}", nativeQuery = true)
    public List<BookingNotAvailabilityDto> availableNotById(@Param("id") Long id);
}

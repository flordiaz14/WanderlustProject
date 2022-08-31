package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.model.BookingAvailableProductsDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IBookingAvailableProducts extends JpaRepository<BookingAvailableProductsDto, Long> {
    @Query(value = "{call availableByDate(:start_date,:finish_date)}", nativeQuery = true)
    List<BookingAvailableProductsDto> availableByDate(String start_date, String finish_date);

    @Query(value = "{call availableByDateCity(:start_date,:finish_date,:city_name)}", nativeQuery = true)
    List<BookingAvailableProductsDto> availableByDateCity(String start_date, String finish_date,String city_name);


}

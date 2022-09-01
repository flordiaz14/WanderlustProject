package com.proyectointegrador.wanderlust.service;

import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.model.*;
import com.proyectointegrador.wanderlust.persistence.entities.Booking;
import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.persistence.entities.User;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface IBookingService {

    NewBookingDto search(Long id) throws ResourceNotFoundException;
    NewBookingDto add(NewBookingDto bookingDto) throws Exception;
    void remove(Long id) throws ResourceNotFoundException;
    Set<BookingDto> findByProductId(Product product);
    Set<BookingDto> findByUserId(User user);
    UpdateBookingDto update(UpdateBookingDto bookingDto) throws Exception;

}

package com.proyectointegrador.wanderlust.service.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.model.*;
import com.proyectointegrador.wanderlust.persistence.entities.Booking;
import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.persistence.entities.User;
import com.proyectointegrador.wanderlust.persistence.repository.IBookingAvailability;
import com.proyectointegrador.wanderlust.persistence.repository.IBookingAvailableProducts;
import com.proyectointegrador.wanderlust.persistence.repository.IBookingNotAvailability;
import com.proyectointegrador.wanderlust.persistence.repository.IBookingRepository;
import com.proyectointegrador.wanderlust.service.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class BookingService implements IBookingService {

    private IBookingRepository bookingRepository;
    private ObjectMapper mapper;

    @Autowired
    public BookingService(IBookingRepository bookingRepository, ObjectMapper mapper) {
        this.bookingRepository = bookingRepository;
        this.mapper = mapper;
    }


    @Override
    public NewBookingDto search(Long id) throws ResourceNotFoundException {
        Optional<Booking> booking = bookingRepository.findById(id);
        NewBookingDto bookingDtos= null;

        if (booking.isPresent()){
            bookingDtos = mapper.convertValue(booking, NewBookingDto.class);
        }else {
            throw new ResourceNotFoundException("Reserva con id: "+id+", no encontrada.");
        }

        return bookingDtos;
    }

    @Override
    public NewBookingDto add(NewBookingDto bookingDto) {
        Booking booking = mapper.convertValue(bookingDto, Booking.class);
        booking = bookingRepository.save(booking);

        return mapper.convertValue(booking, NewBookingDto.class);
    }

    @Override
    public UpdateBookingDto update(UpdateBookingDto bookingDto) throws Exception {
        NewBookingDto newBooking = search(bookingDto.getId());
        newBooking.setStartTime(bookingDto.getStartTime());
        newBooking.setStartDate(bookingDto.getStartDate());
        newBooking.setEndingDate(bookingDto.getEndingDate());
        add(newBooking);

        UpdateBookingDto updateBookingDto = mapper.convertValue(newBooking, UpdateBookingDto.class);

        return updateBookingDto;
    }

    @Override
    public void remove(Long id) throws ResourceNotFoundException {
        Optional<Booking> booking = bookingRepository.findById(id);
        if (booking.isPresent()){
            bookingRepository.deleteById(id);
        } else throw new ResourceNotFoundException("La reserva con el  " + id + " no existe");
    }

    @Override
    public Set<BookingDto> findByProductId(Product product) {
        Set<Booking> bookingByProduct = bookingRepository.findByProductId(product);
        Set<BookingDto> bookingByProductDtos = new HashSet<>();
        for(Booking booking: bookingByProduct)
            bookingByProductDtos.add(mapper.convertValue(booking, BookingDto.class));

        return bookingByProductDtos;
    }

    @Override
    public Set<BookingDto> findByUserId(User user) {
        Set<Booking> bookingByUser = bookingRepository.findByUserId(user);

        Set<BookingDto> bookingsByUserDto = new HashSet<>();
            for(Booking booking: bookingByUser) {
                BookingDto bookingDto = mapper.convertValue(booking, BookingDto.class);
                bookingDto.setProductName(booking.getProduct().getName());
                bookingDto.setProductId(booking.getProduct().getId());
                bookingsByUserDto.add(bookingDto);
            }
            return bookingsByUserDto;

    }


}

package com.proyectointegrador.wanderlust.controller;

import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.model.*;
import com.proyectointegrador.wanderlust.persistence.entities.Booking;
import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.persistence.entities.User;
import com.proyectointegrador.wanderlust.service.IBookingService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/booking")
@CrossOrigin(origins = "*")
public class BookingController {

    private IBookingService bookingService;
    private Long id;

    @Autowired
    public BookingController(IBookingService bookingService) {
        this.bookingService = bookingService;
    }

    @Operation(summary = "Add a new booking")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PostMapping
    public ResponseEntity<NewBookingDto> addBooking(@Valid @RequestBody NewBookingDto bookingDto) throws Exception {
        ResponseEntity<NewBookingDto> response = null;
        if (bookingDto.getId() == null) {
            response = ResponseEntity.status(HttpStatus.CREATED).body(bookingService.add(bookingDto));
        } else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return response;
    }

    @Operation(summary = "Delete a booking")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeBooking(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        bookingService.remove(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Reserva eliminada correctamente");
    }

    @Operation(summary = "Update a booking")
    @PutMapping
    public ResponseEntity<UpdateBookingDto> updateBooking(@RequestBody UpdateBookingDto bookingDto) throws Exception, ResourceNotFoundException {
        ResponseEntity response = null;

        if (bookingDto.getId() != null) {
            response = ResponseEntity.ok(bookingService.update(bookingDto));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @Operation(summary = "Search reservations by product")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/product/{product}")
    public Set<BookingDto> findReservationByProduct(@PathVariable Product product){
        return bookingService.findByProductId(product);
    }

    @Operation(summary = "Search reservations by user")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/product/user/{user}")
    public Set<BookingDto> findReservationByUser(@PathVariable User user) {
        return bookingService.findByUserId(user);
    }



}

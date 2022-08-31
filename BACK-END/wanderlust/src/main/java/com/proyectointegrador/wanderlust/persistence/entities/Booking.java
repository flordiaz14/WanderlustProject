package com.proyectointegrador.wanderlust.persistence.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "bookings")
@Getter
@Setter
@ToString
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "start_time", nullable = false)
    private String startTime;

    @Column(name = "start_date",nullable = false)
    private LocalDate startDate;

    @Column(name ="finish_date", nullable = false)
    private LocalDate endingDate;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Booking() {
    }
}

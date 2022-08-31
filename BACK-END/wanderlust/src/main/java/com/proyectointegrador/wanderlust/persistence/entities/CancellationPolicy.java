package com.proyectointegrador.wanderlust.persistence.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;


@Entity
@Table(name = "cancellationPolicies")
@Getter
@Setter
@ToString
public class CancellationPolicy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    public CancellationPolicy() {
    }
}

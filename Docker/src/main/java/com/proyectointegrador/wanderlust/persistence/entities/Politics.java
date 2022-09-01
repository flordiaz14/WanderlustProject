package com.proyectointegrador.wanderlust.persistence.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "policies")
@Getter
@Setter
@ToString
public class Politics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "policies_id", referencedColumnName = "id", nullable = false)
    @Column
    private Set<Rule> rules = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "policies_id", referencedColumnName = "id", nullable = false)
    @Column
    private Set<Security> healthAndSecurityPolicies = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "policies_id", referencedColumnName = "id", nullable = false)
    @Column
    private Set<CancellationPolicy> cancellationPolicies = new HashSet<>();

    public Politics() {
    }

}

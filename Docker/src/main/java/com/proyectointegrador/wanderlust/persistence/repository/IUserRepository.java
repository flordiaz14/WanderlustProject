package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.model.BookingAvailabilityDto;
import com.proyectointegrador.wanderlust.model.UserDto;
import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.persistence.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    boolean existsByUsername(String username);

    //@Query("select p from Product p inner join User u where u.id = :id")
    //public List<UserDto> getFavoritesByUser(@Param("id") Long id);

}
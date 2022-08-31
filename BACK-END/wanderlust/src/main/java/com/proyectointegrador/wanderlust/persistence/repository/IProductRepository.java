package com.proyectointegrador.wanderlust.persistence.repository;

import com.proyectointegrador.wanderlust.persistence.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {

    //@Query("from Product p where p.name = :name")
    @Query("select p from Product p inner join City c on p.city = c.id where c.name = :name")
    Set<Product> getProductsByCity(@Param("name")String city);

    @Query("select p from Product p inner join Category cat on p.category = cat.id where cat.title = :title")
    Set<Product> getProductsByCategory(@Param("title")String category);

    @Query("select p from Product p where created_by = :admin_id")
    Set<Product> getProductsByUser(@Param("admin_id") Long admin_id);

}

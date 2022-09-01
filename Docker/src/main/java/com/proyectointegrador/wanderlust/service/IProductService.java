package com.proyectointegrador.wanderlust.service;

import com.proyectointegrador.wanderlust.model.BookingAvailabilityDto;
import com.proyectointegrador.wanderlust.model.BookingAvailableProductsDto;
import com.proyectointegrador.wanderlust.model.BookingNotAvailabilityDto;
import com.proyectointegrador.wanderlust.model.ProductDto;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;

import java.util.List;
import java.util.Set;

public interface IProductService {

    ProductDto search(Long id) throws ResourceNotFoundException;
    Set<ProductDto> listAll();
    ProductDto add(ProductDto productDto) throws Exception;
    void remove(Long id) throws ResourceNotFoundException;
    ProductDto update(ProductDto productDto) throws Exception;
    Set<ProductDto> getProductsByCity(String city);
    Set<ProductDto> getProductsByCategory(String category);
    List<BookingAvailabilityDto> findAvailableDateById(Long id);
    List<BookingNotAvailabilityDto> findNotAvailableDateById(Long id);
    Set<ProductDto> findAvailableProductsByDate(String start_date, String finish_date) throws ResourceNotFoundException;
    Set<ProductDto> findAvailableProductsByDateCity(String start_date, String finish_date, String city_name) throws ResourceNotFoundException;
    Set<ProductDto> getProductsByUser(Long id);
}

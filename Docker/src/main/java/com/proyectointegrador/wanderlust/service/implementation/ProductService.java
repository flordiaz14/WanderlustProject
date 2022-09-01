package com.proyectointegrador.wanderlust.service.implementation;

import com.proyectointegrador.wanderlust.model.*;
import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.persistence.repository.IBookingAvailability;
import com.proyectointegrador.wanderlust.persistence.repository.IBookingAvailableProducts;
import com.proyectointegrador.wanderlust.persistence.repository.IBookingNotAvailability;
import com.proyectointegrador.wanderlust.persistence.repository.IProductRepository;
import com.proyectointegrador.wanderlust.service.IProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductService implements IProductService {

    private IProductRepository productRepository;
    private ObjectMapper mapper;

    @Autowired
    private IBookingAvailability bookingAvailability;
    @Autowired
    private IBookingNotAvailability bookingNotAvailability;
    @Autowired
    private IBookingAvailableProducts bookingAvailableProducts;

    @Autowired
    public ProductService(IProductRepository productRepository, ObjectMapper mapper) {
        this.productRepository = productRepository;
        this.mapper = mapper;
    }

    @Override
    public ProductDto search(Long id) throws ResourceNotFoundException {
        Optional<Product> product = productRepository.findById(id);
        ProductDto productDto= null;

        if (product.isPresent()){
            productDto = mapper.convertValue(product, ProductDto.class);
        } else {
            throw new ResourceNotFoundException("Producto con id: "+id+", no encontrado.");
        }

        return productDto;
    }

    @Override
    public Set<ProductDto> listAll(){
        Set<ProductDto> productsDto = new HashSet<>();

        for(Product product: productRepository.findAll()){
            productsDto.add(mapper.convertValue(product, ProductDto.class));
        }
        return productsDto;
    }

    @Override
    public ProductDto add(ProductDto productDto){
        Product product = mapper.convertValue(productDto, Product.class);
        product = productRepository.save(product);

        return mapper.convertValue(product, ProductDto.class);
    }

    public void remove(Long id) throws ResourceNotFoundException{
        Optional <Product> product = productRepository.findById(id);

        if (product.isPresent()){
            productRepository.deleteById(id);
        } else throw new ResourceNotFoundException("Product with id " + id + " dont exist");
    }

    @Override
    public ProductDto update(ProductDto productDto) throws Exception {
        return add(productDto);
    }

    @Override
    public Set<ProductDto> getProductsByCity(String city) {
        Set<Product> allProducts = productRepository.getProductsByCity(city);
        Set<ProductDto> allProductsDTO = new HashSet<>();
        for(Product product: allProducts)
            allProductsDTO.add(mapper.convertValue(product, ProductDto.class));

        return allProductsDTO;
    }

    @Override
    public Set<ProductDto> getProductsByCategory(String category) {
        Set<Product> allProducts = productRepository.getProductsByCategory(category);
        Set<ProductDto> allProductsDTO = new HashSet<>();
        for(Product product: allProducts)
            allProductsDTO.add(mapper.convertValue(product, ProductDto.class));

        return allProductsDTO;
    }

    //Método para actualizar puntuación de producto
    public ProductDto updateRate(NewRateDto rateDto) throws ResourceNotFoundException {
        ProductDto productDto = search(rateDto.getIdProduct());
        productDto.setRates(rateDto.getRateDto());
        return add(productDto);
    }
    @Override
    public List<BookingAvailabilityDto> findAvailableDateById(Long id){
        List<BookingAvailabilityDto> resultado = bookingAvailability.availableById(id);
        return resultado;
    }
    @Override
    public List<BookingNotAvailabilityDto> findNotAvailableDateById(Long id){
        List<BookingNotAvailabilityDto> resultado = bookingNotAvailability.availableNotById(id);
        return resultado;
    }

    @Override
    public Set<ProductDto> findAvailableProductsByDate(String start_date, String finish_date) throws ResourceNotFoundException {
        List<BookingAvailableProductsDto> resultado = bookingAvailableProducts.availableByDate(start_date, finish_date);
        Set<ProductDto> productsDto = new HashSet<>();
        for(BookingAvailableProductsDto product: resultado) {
            ProductDto productDto = search(product.getId_producto());
            productsDto.add(productDto);
        }

        return productsDto;
    }

    @Override
    public Set<ProductDto> findAvailableProductsByDateCity(String start_date, String finish_date, String city_name) throws ResourceNotFoundException {
        List<BookingAvailableProductsDto> resultado = bookingAvailableProducts.availableByDateCity(start_date, finish_date, city_name);
        Set<ProductDto> productsDto = new HashSet<>();
        for(BookingAvailableProductsDto product: resultado) {
            ProductDto productDto = search(product.getId_producto());
            productsDto.add(productDto);
        }

        return productsDto;
    }
    @Override
    public Set<ProductDto> getProductsByUser(Long id) {
        Set<Product> adminProducts = productRepository.getProductsByUser(id);
        Set<ProductDto> adminProductsDto = new HashSet<>();
        for(Product product: adminProducts)
            adminProductsDto.add(mapper.convertValue(product, ProductDto.class));

        return adminProductsDto;
    }


}

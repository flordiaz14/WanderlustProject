package com.proyectointegrador.wanderlust.controller;

import com.proyectointegrador.wanderlust.model.*;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.service.implementation.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "*")
public class ProductController {

    private ProductService productService;
    private Long id;
    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Operation(summary = "Get a product")
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> searchProduct(@PathVariable Long id) throws ResourceNotFoundException {
        ProductDto productDto = productService.search(id);
        return ResponseEntity.ok(productDto);
    }

    @Operation(summary = "List all products")
    @GetMapping
    public ResponseEntity<Set<ProductDto>> listAllProducts() {
        return ResponseEntity.ok(productService.listAll());
    }

    @Operation(summary = "Add a new product")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<ProductDto> addProduct(@Valid @RequestBody ProductDto productDto) {
        ResponseEntity<ProductDto> response = null;
        if (productDto.getId() == null) {
            response = ResponseEntity.status(HttpStatus.CREATED).body(productService.add(productDto));
        } else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return response;
    }

    @Operation(summary = "Delete a product")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeProduct(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        productService.remove(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Producto eliminado correctamente");
    }

    @Operation(summary = "Update a product")
    @PutMapping
    public ResponseEntity<ProductDto> updateProduct(@RequestBody ProductDto productDto) throws Exception, ResourceNotFoundException {
        ResponseEntity response = null;

        if (productDto.getId() != null && productService.search(productDto.getId()) != null) {
            response = ResponseEntity.ok(productService.update(productDto));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @Operation(summary = "Get products by city")
    @GetMapping("/city")
    public Set<ProductDto> listProductsByCity(@RequestParam String name) {
        return productService.getProductsByCity(name);
    }

    @Operation(summary = "Get products by category")
    @GetMapping("/category")
    public Set<ProductDto> listProductsByCategory(@RequestParam String title) {
        return productService.getProductsByCategory(title);
    }

    @Operation(summary = "Get products by user")
    @GetMapping("/admin/{admin_id}")
    public Set<ProductDto> listProductsByUser(@PathVariable Long admin_id) {
        return productService.getProductsByUser(admin_id);
    }


    @Operation(summary = "Update a rate of product")
    @PutMapping("/rate")
    public ResponseEntity<ProductDto> updateRate(@RequestBody NewRateDto rateDto) throws Exception, ResourceNotFoundException {
        return ResponseEntity.ok(productService.updateRate(rateDto));

    }

    @GetMapping("/availability/{id}")
    public ResponseEntity<List<BookingAvailabilityDto>> findAvailableDateById(@PathVariable Long id){
        List<BookingAvailabilityDto> findAvailableDateById = productService.findAvailableDateById(id);
        return new ResponseEntity(findAvailableDateById,HttpStatus.OK);
    }
    @GetMapping("/na/{id}")
    public ResponseEntity<List<BookingNotAvailabilityDto>> findNotAvailableDateById(@PathVariable Long id){
        List<BookingNotAvailabilityDto> findNotAvailableDateById = productService.findNotAvailableDateById(id);
        return new ResponseEntity(findNotAvailableDateById,HttpStatus.OK);
    }

    @GetMapping("/{start_date}/{finish_date}")
    public ResponseEntity<Set<ProductDto>> findAvailableProductsByDate(@PathVariable String start_date, @PathVariable String finish_date) throws ResourceNotFoundException {
        Set<ProductDto> findAvailableProductsByDate = productService.findAvailableProductsByDate(start_date, finish_date);
        return new ResponseEntity(findAvailableProductsByDate,HttpStatus.OK);
    }

    @GetMapping("/{start_date}/{finish_date}/{city_name}")
    public ResponseEntity<Set<ProductDto>> findAvailableProductsByDate(@PathVariable String start_date, @PathVariable String finish_date, @PathVariable String city_name ) throws ResourceNotFoundException{
        Set<ProductDto> findAvailableProductsByDateCity = productService.findAvailableProductsByDateCity(start_date, finish_date,city_name);
        return new ResponseEntity(findAvailableProductsByDateCity,HttpStatus.OK);
    }


}

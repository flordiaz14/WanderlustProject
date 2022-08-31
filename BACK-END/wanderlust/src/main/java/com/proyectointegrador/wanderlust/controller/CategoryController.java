package com.proyectointegrador.wanderlust.controller;

import com.proyectointegrador.wanderlust.model.CategoryDto;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.service.implementation.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin(origins = "*")
public class CategoryController {


    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @Operation(summary = "Add a new category")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CategoryDto> addCategory(@Valid @RequestBody CategoryDto categoryDto) {
        ResponseEntity<CategoryDto> response = null;
        if (categoryDto.getId() == null) {
            response = ResponseEntity.status(HttpStatus.CREATED).body(categoryService.add(categoryDto));
        } else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return response;
    }

    @Operation(summary = "List all categories")
    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Set<CategoryDto>> listAllCategories() {
        return ResponseEntity.ok(categoryService.listAll());
    }

    @Operation(summary = "Update a category")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDto) throws Exception, ResourceNotFoundException {
        ResponseEntity response = null;

        if (categoryDto.getId() != null && categoryService.search(categoryDto.getId()) != null) {
            response = ResponseEntity.ok(categoryService.update(categoryDto));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @Operation(summary = "Delete a category")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeCategory(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        categoryService.remove(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Categoría eliminada correctamente");
    }

    @Operation(summary = "Get a category")
    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<CategoryDto> searchCategory(@PathVariable Long id) throws ResourceNotFoundException {
        CategoryDto categoryDto = categoryService.search(id);
        return ResponseEntity.ok(categoryDto);
    }

}

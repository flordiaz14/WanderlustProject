package com.proyectointegrador.wanderlust.controller;

import com.proyectointegrador.wanderlust.model.CityDto;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.service.implementation.CityService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Set;

@RestController
@RequestMapping("/city")
@CrossOrigin(origins = "*")
public class CityController {

    private CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @Operation(summary = "Add a new city")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<CityDto> addCity(@Valid @RequestBody CityDto cityDto) {
        ResponseEntity<CityDto> response = null;
        if (cityDto.getId() == null) {
            response = ResponseEntity.status(HttpStatus.CREATED).body(cityService.add(cityDto));
        } else {
            response = ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return response;
    }

    @Operation(summary = "List all cities")
    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Set<CityDto>> listAllCities() {
        return ResponseEntity.ok(cityService.listAll());
    }

    @Operation(summary = "Update a city")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<CityDto> updateCity(@RequestBody CityDto cityDto) throws Exception, ResourceNotFoundException {
        ResponseEntity response = null;

        if (cityDto.getId() != null && cityService.search(cityDto.getId()) != null) {

            response = ResponseEntity.ok(cityService.update(cityDto));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return response;
    }

    @Operation(summary = "Delete a city")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> removeCity(@PathVariable Long id) throws ResourceNotFoundException {
        ResponseEntity response = null;
        cityService.remove(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Ciudad eliminada correctamente");
    }

    @Operation(summary = "Get a city")
    //@PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<CityDto> searchCity(@PathVariable Long id) throws ResourceNotFoundException {
        CityDto cityDto = cityService.search(id);
        return ResponseEntity.ok(cityDto);
    }
}

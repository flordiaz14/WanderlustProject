package com.proyectointegrador.wanderlust.controller;

import com.proyectointegrador.wanderlust.model.CityDto;
import com.proyectointegrador.wanderlust.model.FeatureDto;
import com.proyectointegrador.wanderlust.service.IFeatureService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/feature")
@CrossOrigin(origins = "*")
public class FeatureController {

    private IFeatureService featureService;

    @Autowired
    public FeatureController(IFeatureService featureService) {
        this.featureService = featureService;
    }

    @Operation(summary = "List all features")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<Set<FeatureDto>> listAllFeatures() {
        return ResponseEntity.ok(featureService.listAll());
    }
}

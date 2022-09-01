package com.proyectointegrador.wanderlust.service.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyectointegrador.wanderlust.model.FeatureDto;
import com.proyectointegrador.wanderlust.persistence.entities.Feature;
import com.proyectointegrador.wanderlust.persistence.repository.IFeatureRepository;
import com.proyectointegrador.wanderlust.service.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class FeatureService implements IFeatureService {

    private IFeatureRepository featureRepository;
    private ObjectMapper mapper;

    @Autowired
    public FeatureService(IFeatureRepository featureRepository, ObjectMapper mapper) {
        this.featureRepository = featureRepository;
        this.mapper = mapper;
    }


    @Override
    public Set<FeatureDto> listAll() {
        Set<FeatureDto> featureDto = new HashSet<>();

        for(Feature feature: featureRepository.findAll()){
            featureDto.add(mapper.convertValue(feature, FeatureDto.class));
        }

        return featureDto;
    }
}

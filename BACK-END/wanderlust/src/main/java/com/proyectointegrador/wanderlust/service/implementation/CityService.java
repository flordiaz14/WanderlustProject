package com.proyectointegrador.wanderlust.service.implementation;

import com.proyectointegrador.wanderlust.model.CityDto;
import com.proyectointegrador.wanderlust.persistence.entities.City;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.persistence.repository.ICityRepository;
import com.proyectointegrador.wanderlust.service.ICityService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CityService implements ICityService {

    private ICityRepository cityRepository;
    private ObjectMapper mapper;

    @Autowired
    public CityService(ICityRepository cityRepository, ObjectMapper mapper) {
        this.cityRepository = cityRepository;
        this.mapper = mapper;
    }

    @Override
    public CityDto search(Long id) throws ResourceNotFoundException {
        Optional<City> city = cityRepository.findById(id);
        CityDto cityDto = null;

        if (city.isPresent()) {
            cityDto = mapper.convertValue(city, CityDto.class);
        } else {
            throw new ResourceNotFoundException("Ciudad con id: " + id + ", no encontrada.");
        }
        return cityDto;
    }

    @Override
    public CityDto add(CityDto cityDto) {
        City city = mapper.convertValue(cityDto, City.class);
        city = cityRepository.save(city);

        return mapper.convertValue(city, CityDto.class);
    }

    @Override
    public void remove(Long id) throws ResourceNotFoundException {
        Optional<City> city = cityRepository.findById(id);

        if (city.isPresent()) {
            cityRepository.deleteById(id);
        } else throw new ResourceNotFoundException("Ciudad con id " + id + " no encontrada");
    }

    @Override
    public CityDto update(CityDto cityDto) throws Exception {
        return add(cityDto);
    }

    @Override
    public Set<CityDto> listAll() {
        Set<CityDto> cityDto = new HashSet<>();

        for(City city: cityRepository.findAll()){
            cityDto.add(mapper.convertValue(city, CityDto.class));
        }

        return cityDto;
    }
}

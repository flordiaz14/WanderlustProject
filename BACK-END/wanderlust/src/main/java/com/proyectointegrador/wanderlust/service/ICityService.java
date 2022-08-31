package com.proyectointegrador.wanderlust.service;


import com.proyectointegrador.wanderlust.model.CityDto;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;

import java.util.Set;

public interface ICityService {

    CityDto search(Long id) throws ResourceNotFoundException;
    CityDto add(CityDto cityDto) throws Exception;
    void remove(Long id) throws ResourceNotFoundException;
    CityDto update(CityDto cityDto) throws Exception;
    Set<CityDto> listAll();

}

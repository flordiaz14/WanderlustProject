package com.proyectointegrador.wanderlust.service;

import com.proyectointegrador.wanderlust.model.CityDto;
import com.proyectointegrador.wanderlust.model.FeatureDto;

import java.util.Set;

public interface IFeatureService {

    Set<FeatureDto> listAll();
}

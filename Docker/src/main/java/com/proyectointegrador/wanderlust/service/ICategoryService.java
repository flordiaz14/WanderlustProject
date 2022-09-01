package com.proyectointegrador.wanderlust.service;

import com.proyectointegrador.wanderlust.model.CategoryDto;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;

import java.util.Set;

public interface ICategoryService {

    CategoryDto search(Long id) throws ResourceNotFoundException;
    CategoryDto add(CategoryDto categoryDto)throws Exception;
    void remove(Long id)throws ResourceNotFoundException;
    CategoryDto update(CategoryDto categoryDto) throws Exception;
    Set<CategoryDto> listAll();
}

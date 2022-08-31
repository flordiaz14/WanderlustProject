package com.proyectointegrador.wanderlust.service.implementation;

import com.proyectointegrador.wanderlust.model.CategoryDto;
import com.proyectointegrador.wanderlust.persistence.entities.Category;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.persistence.repository.ICategoryRepository;
import com.proyectointegrador.wanderlust.service.ICategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryService implements ICategoryService {

    private ICategoryRepository categoryRepository;
    private ObjectMapper mapper;

    @Autowired
    public CategoryService(ICategoryRepository categoryRepository, ObjectMapper mapper) {
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }

    public CategoryDto search(Long id)throws ResourceNotFoundException {
        Optional<Category> category = categoryRepository.findById(id);
        CategoryDto categoryDto= null;

        if (category.isPresent()){
            categoryDto = mapper.convertValue(category, CategoryDto.class);
        }else {
            throw new ResourceNotFoundException("Categoría con id: "+id+", no encontrada.");
        }

        return categoryDto;
    }

    public CategoryDto add(CategoryDto categoryDto){
        Category category= mapper.convertValue(categoryDto, Category.class);
        category = categoryRepository.save(category);

        return mapper.convertValue(category, CategoryDto.class);
    }



    public void remove(Long id) throws ResourceNotFoundException{
        Optional <Category> category = categoryRepository.findById(id);
        if (category.isPresent()){
            categoryRepository.deleteById(id);
        } else throw new ResourceNotFoundException("La categoría con el  " + id + " no existe");
    }

    public CategoryDto update(CategoryDto categoryDto) throws Exception{
        return add(categoryDto);
    }

    public Set<CategoryDto> listAll(){

        Set<CategoryDto> categoriesDto = new HashSet<>();

        for(Category category: categoryRepository.findAll()){
            categoriesDto.add(mapper.convertValue(category, CategoryDto.class));
        }
        return categoriesDto;
    }
}


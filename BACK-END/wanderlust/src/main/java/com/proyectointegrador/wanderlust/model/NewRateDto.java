package com.proyectointegrador.wanderlust.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class NewRateDto {

    private Long idProduct;
    private List<RateDto> rateDto;

}

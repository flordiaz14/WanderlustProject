package com.proyectointegrador.wanderlust.model;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
public class ErrorsResponseDto {

    private Integer status;
    private Map<String, String> messages = new HashMap<>();
    private String date;


    public ErrorsResponseDto(Integer status, Map<String, String> messages, String date) {
        this.status = status;
        this.messages = messages;
        this.date = date;
    }
}

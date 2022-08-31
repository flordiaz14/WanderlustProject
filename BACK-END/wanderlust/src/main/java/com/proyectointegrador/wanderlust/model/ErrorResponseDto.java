package com.proyectointegrador.wanderlust.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ErrorResponseDto {

    private Integer status;
    private String message;
    private String date;

    public ErrorResponseDto() {
    }

    public ErrorResponseDto(Integer status, String message, String date) {
        this.status = status;
        this.message = message;
        this.date = date;
    }
}

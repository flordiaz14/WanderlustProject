package com.proyectointegrador.wanderlust.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;


@Component
public class UnauthorizedEntryPoint implements AuthenticationEntryPoint, Serializable {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {

        //Este error marca que no estás autorizado
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Por favor vuelva a intentarlo, sus credenciales son inválidas.");
    }

}
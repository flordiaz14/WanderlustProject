package com.proyectointegrador.wanderlust.config;


import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AccessDeniedHandler implements org.springframework.security.web.access.AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response,
                       AccessDeniedException e) throws IOException, ServletException {

        //Este error marca que estás logueado, pero que no tenés acceso
        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Acceso denegado, no tienes permisos");

    }

}
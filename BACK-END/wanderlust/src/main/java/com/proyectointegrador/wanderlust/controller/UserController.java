package com.proyectointegrador.wanderlust.controller;

import com.proyectointegrador.wanderlust.config.TokenProvider;
import com.proyectointegrador.wanderlust.exception.EmailAlreadyExistsException;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.model.*;
import com.proyectointegrador.wanderlust.persistence.entities.User;
import com.proyectointegrador.wanderlust.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/users")
public class UserController {

    private AuthenticationManager authenticationManager;
    private TokenProvider jwtTokenUtil;
    private IUserService userService;

    public UserController(AuthenticationManager authenticationManager, TokenProvider jwtTokenUtil, IUserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> generateToken(@RequestBody LoginUserDto loginUserDto) throws AuthenticationException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getUsername(),
                        loginUserDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userService.findOne(loginUserDto.getUsername());
        final String token = jwtTokenUtil.generateToken(authentication);
        return ResponseEntity.ok(new AuthTokenDto(user.getId(),
                user.getUsername(),
                user.getName(),
                user.getLastname(),
                token, user.getValidate(),
                user.getFavorites()));
    }

    @PostMapping("/register")
    public ResponseEntity<User> saveUser(@RequestBody UserDto user) throws EmailAlreadyExistsException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(user));
    }

    @Operation(summary = "Update a user")
    @PutMapping
    public ResponseEntity<UserUpdateDto> updateCity(@RequestBody UserUpdateDto userDto) throws Exception, ResourceNotFoundException {
        ResponseEntity response = null;

        if (userService.findOne(userDto.getUsername()) != null) {

            response = ResponseEntity.ok(userService.update(userDto));
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        return response;
    }

    @PostMapping
    public User findUser(@RequestBody TokenDto user){
        String username = jwtTokenUtil.getUsernameFromToken(user.getToken());
        User userFind = userService.findOne(username);
        return userFind;
    }

    @Operation(summary = "Get a user")
    @GetMapping("/{id}")
    public ResponseEntity<UserNewDto> searchUser(@PathVariable Long id) throws ResourceNotFoundException {
        UserNewDto userDto = userService.search(id);
        return ResponseEntity.ok(userDto);
    }

    @PutMapping("/updatefavorite")
    public ResponseEntity<UserNewDto> updateFavorite(@RequestBody UserNewDto userNewDto) throws Exception {
    UserNewDto favorite = userService.updateFavorite(userNewDto);
    return new ResponseEntity(favorite,HttpStatus.OK);
    }

}

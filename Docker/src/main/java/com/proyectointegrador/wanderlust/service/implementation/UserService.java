package com.proyectointegrador.wanderlust.service.implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.proyectointegrador.wanderlust.exception.ResourceNotFoundException;
import com.proyectointegrador.wanderlust.model.ProductDto;
import com.proyectointegrador.wanderlust.model.UserNewDto;
import com.proyectointegrador.wanderlust.model.UserUpdateDto;
import com.proyectointegrador.wanderlust.persistence.entities.Product;
import com.proyectointegrador.wanderlust.persistence.entities.Role;
import com.proyectointegrador.wanderlust.persistence.entities.User;
import com.proyectointegrador.wanderlust.model.UserDto;
import com.proyectointegrador.wanderlust.exception.EmailAlreadyExistsException;
import com.proyectointegrador.wanderlust.persistence.repository.IUserRepository;
import com.proyectointegrador.wanderlust.service.IRoleService;
import com.proyectointegrador.wanderlust.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service(value = "userService")
public class UserService implements UserDetailsService, IUserService {

    @Autowired
    private IRoleService roleService;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    @Autowired
    private ObjectMapper mapper;


    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("El nombre de usuario no existe");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), getAuthority(user));
    }


    private Set<SimpleGrantedAuthority> getAuthority(User user) {
        Role role = user.getRoles();
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        return authorities;
    }


    public List<User> findAll() {
        List<User> list = new ArrayList<>();
        userRepository.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public User findOne(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User save(UserDto user) {

        User nUser = user.getUserFromDto();

        if (userRepository.existsByUsername(nUser.getUsername()))
            throw new EmailAlreadyExistsException("El email ya se encuentra en uso");

        nUser.setPassword(bcryptEncoder.encode(user.getPassword()));

        Role role = roleService.findByName("USER");
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role);

        if (nUser.getUsername().split("@")[1].equals("admin.edu")) {
            role = roleService.findByName("ADMIN");
            roleSet.add(role);
            nUser.setValidate(true);
        }

        nUser.setRoles(role);
        return userRepository.save(nUser);
    }


    @Override
    public User update(UserUpdateDto userDto) throws Exception {

        User user = findOne(userDto.getUsername());
        if (userDto.getValidate() == null) {
            user.setCity(userDto.getCity());
        } else {
            user.setValidate(userDto.getValidate());
        }
        userRepository.save(user);
        return user;
    }

    @Override
    public UserNewDto search(Long id) throws ResourceNotFoundException {
        Optional<User> user = userRepository.findById(id);
        UserNewDto userDto = null;

        if (user.isPresent()) {
            userDto = mapper.convertValue(user, UserNewDto.class);
        } else {
            throw new ResourceNotFoundException("Usuario con id: " + id + ", no encontrado.");
        }

        return userDto;
    }

    @Override
    public UserNewDto updateFavorite(UserNewDto userNewDto) throws Exception {
        User user = findOne(userNewDto.getUsername());
        Boolean flag = user.getFavorites()
                           .removeIf(product -> product.getId() == userNewDto.getProduct().getId());

        if (!flag) {
            user.getFavorites().add(userNewDto.getProduct());
        }

        userRepository.save(user);
        UserNewDto userDto = mapper.convertValue(user, UserNewDto.class);
        return userDto;

    }
}
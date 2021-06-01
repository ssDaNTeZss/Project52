package com.mycompany.shop.security;

import com.mycompany.shop.basket.Basket;
import com.mycompany.shop.basket.BasketRepository;
import com.mycompany.shop.basket.BasketSessionBean;
import com.mycompany.shop.security.userdetails.UserDetailsImpl;
import com.mycompany.shop.user.User;
import com.mycompany.shop.user.UserRepository;
import com.mycompany.shop.user.UserSessionBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class SecurityController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BasketRepository basketRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    BasketSessionBean basketSessionBean;

    @Autowired
    UserSessionBean userSessionBean;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        User authenticatedUser = new User(userDetails.getId(), userDetails.getUsername());

        userSessionBean.setUser(authenticatedUser);

        if (basketRepository.findBasketByUserId(userDetails.getId()).isPresent()) {
            Basket basket = basketRepository.findBasketByUserId(userDetails.getId()).get();
            basketSessionBean.setBasket(basket);
        } else {
            basketSessionBean.setBasket(null);
        }

        return ResponseEntity.ok(authenticatedUser);
    }

    @PostMapping("/logout")
    public void logout() {
        Basket basket = basketSessionBean.getBasket();
        if (basket != null) {
            basketSessionBean.setBasket(null);
        }
        userSessionBean.setUser(null);
        SecurityContextHolder.clearContext();
    }

    @PostMapping("/create")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Username \"" + user.getUsername() + "\" is already taken!");
        } else {
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(passwordEncoder.encode(user.getPassword()));
            newUser.setEmail(user.getEmail());
            userRepository.save(newUser);
            return ResponseEntity.ok(newUser.getUsername());
        }
    }

}

package com.mycompany.shop.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/userinfo")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserSessionBean userSessionBean;

    @GetMapping()
    public ResponseEntity<User> retrieveUser() {

        Long userId = userSessionBean.getUser().getId();
        Optional<User> optionalUser = userRepository.findById(userId);
        User user;

        if (optionalUser.isPresent()) {
            user = new User(optionalUser.get().getId(), optionalUser.get().getUsername(), optionalUser.get().getEmail());
        } else {
            throw new UserNotFoundException("The user with id: " + userId + " is not found");
        }

        return  ResponseEntity.ok(user);
    }

}

package vn.tholv.web.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.tholv.web.core.base.controller.AbstractController;
import vn.tholv.web.core.base.entity.User;
import vn.tholv.web.core.base.service.UserService;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController extends AbstractController<User, Integer> {
    private final UserService userService;

    @PostMapping("/create")
    public User create(@RequestBody User user) {
        return userService.save(user);
    }
}

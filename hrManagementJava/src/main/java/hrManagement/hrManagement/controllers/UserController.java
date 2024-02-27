package hrManagement.hrManagement.controllers;

import hrManagement.hrManagement.Entities.User;
import hrManagement.hrManagement.dto.DeletedEntityDto;
import hrManagement.hrManagement.dto.userDto.SaveUserRequestDto;
import hrManagement.hrManagement.dto.userDto.UpdateUserRequestDto;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import hrManagement.hrManagement.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("users")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    private UserService userService;

    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/get")
    public ResponseEntity<User> getUserByCredentials
            (@RequestParam("username") String username,
             @RequestParam("password") String password) {
        return userService.findUserByCredentials(username, password);
    }

    @PostMapping("/save")
    public ResponseEntity<SaveUserRequestDto> saveUser(@RequestBody SaveUserRequestDto dto) throws Exception {
        return userService.saveUser(dto);
    }

    @PatchMapping("/update/{userId}/{managerId}")
    public ResponseEntity<UpdateUserRequestDto> updateUser
            (@PathVariable("userId") Integer userId,
             @PathVariable("managerId") Integer managerId,
             @RequestBody UpdateUserRequestDto dto) throws Exception {
        return userService.updateUser(userId, managerId, dto);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<DeletedEntityDto> deleteUser(@PathVariable("id") Integer id) throws EntityNotFoundException {
        return userService.deleteUser(id);
    }

    @GetMapping("/unique")
    public ResponseEntity<Boolean> checkForUsernameUniqueness(
            @RequestParam("newUsername") String newUsername,
            @RequestParam("currentUsername") String currentUsername) {
        return userService.checkForUsernameUniqueness(newUsername, currentUsername);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Integer id) throws EntityNotFoundException {
        Optional<User> user = userService.getUserById(id);
        if (user.isEmpty()) {
            throw new EntityNotFoundException("User with id:" + id + " doesnt exist");
        }
        return ResponseEntity.ok(user.get());
    }
}

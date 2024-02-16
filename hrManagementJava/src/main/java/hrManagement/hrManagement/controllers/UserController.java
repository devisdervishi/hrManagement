package hrManagement.hrManagement.controllers;

import hrManagement.hrManagement.Entities.User;
import hrManagement.hrManagement.dto.userDto.SaveUserRequestDto;
import hrManagement.hrManagement.dto.userDto.UpdateUserRequestDto;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import hrManagement.hrManagement.services.UserService;
import jakarta.websocket.server.PathParam;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    private UserService userService;
    @GetMapping("/get")
    public ResponseEntity<User> getUserByCredentials
            (@RequestParam("username") String username,
             @RequestParam("password") String password){
        return userService.findUserByCredentials(username,password);
    }

    @PostMapping("/save")
    public ResponseEntity<SaveUserRequestDto> saveUser(@RequestBody SaveUserRequestDto dto){
        return userService.saveUser(dto);
    }
    @PatchMapping("/update/{id}")
    public ResponseEntity<UpdateUserRequestDto> updateUser
            (@PathVariable("id") Integer id,
             @RequestBody UpdateUserRequestDto dto) throws EntityNotFoundException {
        return userService.updateUser(id,dto);
    }
    @DeleteMapping("delete/{id}")
    public ResponseEntity deleteUser(@PathVariable("id") Integer id) throws EntityNotFoundException {
        return userService.deleteUser(id);
    }
    @GetMapping("/unique")
    public ResponseEntity<Boolean> checkForUsernameUniqueness(
            @RequestParam("newUsername")String newUsername,
            @RequestParam("currentUsername")String currentUsername){
        return userService.checkForUsernameUniqueness(newUsername,currentUsername);
    }
}

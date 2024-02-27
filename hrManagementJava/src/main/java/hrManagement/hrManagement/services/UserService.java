package hrManagement.hrManagement.services;

import hrManagement.hrManagement.Entities.User;
import hrManagement.hrManagement.dto.DeletedEntityDto;
import hrManagement.hrManagement.dto.userDto.SaveUserRequestDto;
import hrManagement.hrManagement.dto.userDto.UpdateUserRequestDto;
import hrManagement.hrManagement.enums.UserType;
import hrManagement.hrManagement.exceptions.CommonException;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import hrManagement.hrManagement.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    @Bean
    private BCryptPasswordEncoder servicePasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

    public ResponseEntity<SaveUserRequestDto> saveUser(SaveUserRequestDto dto) throws Exception {
        if (checkForUsernameUniqueness(dto.getUsername(), "").getBody()) {
            throw new CommonException("Username must be unique");
        }
        ;
        User newUser = User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .username(dto.getUsername())
                .password(servicePasswordEncoder().encode(dto.getPassword()))
                .role(UserType.USER)
                .createdAt(new Date(System.currentTimeMillis()))
                .createdBy(dto.getUsername())
                .DaysOff(20).build();
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @Transactional
    public ResponseEntity<UpdateUserRequestDto> updateUser(Integer userId, Integer managerId, UpdateUserRequestDto dto) throws Exception {
        Optional<User> userToBeUpdated = userRepository.findById(userId);
        Optional<User> manager = userRepository.findById(managerId);
        if (userToBeUpdated.isEmpty()) {
            throw new EntityNotFoundException("User with id:" + userId + " doesnt exist");
        } else if (manager.isEmpty()) {
            throw new EntityNotFoundException("Manager with id:" + managerId + " doesnt exist");
        } else {
            if (checkForUsernameUniqueness(dto.getUsername(), userToBeUpdated.get().getUsername()).getBody()) {
                throw new CommonException("Username must be unique");
            }
            ;
            userToBeUpdated.get().setFirstName(dto.getFirstName());
            userToBeUpdated.get().setLastName(dto.getLastName());
            userToBeUpdated.get().setUsername(dto.getUsername());
            userToBeUpdated.get().setModifiedBy(manager.get().getUsername());
            userToBeUpdated.get().setModifiedAt(new Date(System.currentTimeMillis()));
            userRepository.save(userToBeUpdated.get());
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
    }

    @Transactional
    public ResponseEntity<Integer> updateUserDaysOff(Integer userId, Integer daysToBeRemoved) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new EntityNotFoundException(("User with id:" + userId + "doesnt exist"));
        }
        user.get().setDaysOff(user.get().getDaysOff() - daysToBeRemoved);
        userRepository.save(user.get());
        return ResponseEntity.ok(user.get().getDaysOff());
    }

    @Transactional
    public ResponseEntity<DeletedEntityDto> deleteUser(Integer id) throws EntityNotFoundException {
        Optional<User> userToDelete = userRepository.findById(id);
        if (userToDelete.isEmpty()) {
            throw new EntityNotFoundException(("User with id:" + id + "doesnt exist"));
        }
        userRepository.deleteById(id);
        DeletedEntityDto dto = DeletedEntityDto.builder().message("Deleted").build();
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    public ResponseEntity<User> findUserByCredentials(String username, String password) {
        Optional<User> userByCredentials = userRepository.findByUsername(username);
        if (userByCredentials.isPresent()) {
            if (servicePasswordEncoder().matches(password, userByCredentials.get().getPassword())) {
                return ResponseEntity.ok(userByCredentials.get());
            }
        }
        return null;
    }

    public ResponseEntity<Boolean> checkForUsernameUniqueness(String newUsername, String currentUsername) {
        Optional<User> user = userRepository.checkForUserWithUsername(currentUsername, newUsername);
        if (user.isEmpty()) {
            return ResponseEntity.ok(false);
        } else return ResponseEntity.ok(true);
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

}

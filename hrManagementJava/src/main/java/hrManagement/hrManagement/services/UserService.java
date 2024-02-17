package hrManagement.hrManagement.services;

import hrManagement.hrManagement.Entities.User;
import hrManagement.hrManagement.dto.userDto.SaveUserRequestDto;
import hrManagement.hrManagement.dto.userDto.UpdateUserRequestDto;
import hrManagement.hrManagement.enums.UserType;
import hrManagement.hrManagement.exceptions.CommonException;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import hrManagement.hrManagement.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.hibernate.action.internal.EntityActionVetoException;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserService {
    private UserRepository userRepository;

    @Bean
    private BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    public ResponseEntity<SaveUserRequestDto> saveUser(SaveUserRequestDto dto) throws Exception {
        if(checkForUsernameUniqueness(dto.getUsername(), "").getBody()){
            throw new CommonException("Username must be unique");
        };
        User newUser= User.builder()
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .username(dto.getUsername())
                .password(passwordEncoder().encode(dto.getPassword()))
                .role(UserType.USER)
                .createdAt(new Date(System.currentTimeMillis()))
                .DaysOff(20).build();
        userRepository.save(newUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }
    public ResponseEntity<UpdateUserRequestDto> updateUser(Integer id,UpdateUserRequestDto dto) throws Exception {
        Optional<User> userToBeUpdated=userRepository.findById(id);
        if (userToBeUpdated.isEmpty()){throw new EntityNotFoundException("User with id:"+id+"doesnt exist");}
        else{
            if(checkForUsernameUniqueness(dto.getUsername(), "").getBody()){
                throw new CommonException("Username must be unique");
            };
            userToBeUpdated.get().setFirstName(dto.getFirstName());
            userToBeUpdated.get().setLastName(dto.getLastName());
            userToBeUpdated.get().setUsername(dto.getUsername());
            userRepository.save(userToBeUpdated.get());
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        }
    }
    public ResponseEntity<Integer> updateUserDaysOff(Integer userId,Integer daysToBeRemoved) throws Exception {
        Optional<User> user=userRepository.findById(userId);
        if(user.isEmpty()){throw new EntityNotFoundException(("User with id:"+userId+"doesnt exist"));}
        user.get().setDaysOff(user.get().getDaysOff()-daysToBeRemoved);
        userRepository.save(user.get());
        return ResponseEntity.ok(user.get().getDaysOff());
    }
    public ResponseEntity deleteUser(Integer id) throws EntityNotFoundException {
        Optional<User> userToDelete=userRepository.findById(id);
        if (userToDelete.isEmpty()){throw new EntityNotFoundException(("User with id:"+id+"doesnt exist"));}
        userRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Deleted");
    }
    public ResponseEntity<User> findUserByCredentials(String username,String password){
        Optional<User> userByCredentials=userRepository.findByUsername(username);
        if (userByCredentials.isPresent()){
            if(passwordEncoder().matches(password,userByCredentials.get().getPassword())) {
                return ResponseEntity.ok(userByCredentials.get());
            }
        }
        return null;
    }
    public ResponseEntity<Boolean> checkForUsernameUniqueness(String newUsername,String currentUsername){
        Optional<User> user=userRepository.checkForUserWithUsername(currentUsername,newUsername);
        if (user.isEmpty()){return ResponseEntity.ok(false);}
        else return ResponseEntity.ok(true);
    }
}

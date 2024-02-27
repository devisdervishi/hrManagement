package hrManagement.hrManagement.securityConfig;

import hrManagement.hrManagement.Entities.User;
import hrManagement.hrManagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import java.util.Optional;
public class UserInfoDetailsService implements UserDetailsService {
    @Autowired
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> member = repository.findByUsername(username);
        return member.map(MyUserDetails::new).orElseThrow(() -> new
                UsernameNotFoundException("User with username :" + username + "doesn't exist"));
    }
}

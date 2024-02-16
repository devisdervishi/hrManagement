package hrManagement.hrManagement.repositories;

import hrManagement.hrManagement.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    Optional<User> findByUsername(String username);
    @Query(nativeQuery = true,value = "select * from users as u where u.username=:nUsername and u.username !=:cUsername")
    Optional<User> checkForUserWithUsername(@Param("cUsername") String currentUsername, @Param("nUsername") String newUsername);
}

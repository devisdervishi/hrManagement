package hrManagement.hrManagement;

import hrManagement.hrManagement.Entities.User;
import hrManagement.hrManagement.enums.UserType;
import hrManagement.hrManagement.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Date;

import static org.springframework.data.domain.ExampleMatcher.GenericPropertyMatchers.ignoreCase;

@SpringBootApplication(exclude={SecurityAutoConfiguration.class})
public class HrMenagmetApplication implements CommandLineRunner {

	@Autowired
	private UserRepository userRepo;
	public static void main(String[] args) {
		SpringApplication.run(HrMenagmetApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		ExampleMatcher modelMatcher = ExampleMatcher.matching()
				.withIgnorePaths("id")
				.withMatcher("username", ignoreCase())
				.withMatcher("role", ignoreCase())
				.withMatcher("firstName",ignoreCase())
				.withMatcher("lastName",ignoreCase())
				.withMatcher("DaysOff",ignoreCase());

		User manager=User.builder()
				.role(UserType.MANAGER)
				.username("manager")
				.firstName("Manager")
				.lastName("Manage")
				.DaysOff(0)
				.build();
		Example<User> example = Example.of(manager, modelMatcher);
		if (!userRepo.exists(example)){
			manager.setCreatedBy("Devis");
			manager.setCreatedAt(new Date(System.currentTimeMillis()));
			manager.setPassword(new BCryptPasswordEncoder().encode("manager111"));
			userRepo.save(manager);
		}
		}
	}


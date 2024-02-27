package hrManagement.hrManagement.securityConfig;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChainApp(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/users/get").permitAll()
                        .requestMatchers("/users/save").permitAll()
                        .requestMatchers("/users/unique/**").permitAll()
                        .requestMatchers("/users/getAll").hasRole("MANAGER")
                        .requestMatchers("/users/update/**").hasRole("MANAGER")
                        .requestMatchers("/users/delete/**").hasRole("MANAGER")
                        .requestMatchers("/users/get/{id}/**").hasAnyRole("MANAGER", "USER")
                        .requestMatchers("/timeSheets/save/{userId}/**").hasRole("USER")
                        .requestMatchers("/timeSheets/updateByUser/{id}/**").hasRole("USER")
                        .requestMatchers("/timeSheets/updateByManager/{id}/**").hasRole("MANAGER")
                        .requestMatchers("/timeSheets/delete/{id}/**").hasRole("USER")
                        .requestMatchers("/timeSheets/user/{id}/**").hasAnyRole("MANAGER", "USER")
                        .requestMatchers("/timeSheets/edited/**").hasAnyRole("MANAGER", "USER")
                        .requestMatchers("/timeSheets/new/**").hasAnyRole("MANAGER", "USER")

                )
                .formLogin(Customizer.withDefaults())
                .logout(Customizer.withDefaults())
                .httpBasic(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserInfoDetailsService();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
}

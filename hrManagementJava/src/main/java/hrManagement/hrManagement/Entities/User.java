package hrManagement.hrManagement.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import hrManagement.hrManagement.enums.UserType;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.validator.constraints.Length;

import java.util.List;
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Users")
public class User extends BaseEntity {

    @Length(max = 45,message = "First name should contain max 45 chars")
    @NotNull
    @NotBlank
    private String firstName;
    @Length(max = 45,message = "Last name should contain max 45 chars")
    private String lastName;
    @Column(unique = true)
    @Length(max = 45,message = "Username should contain max 45 chars")
    @NotNull
    @NotBlank
    private String username;
    @Length(max = 60)
    @NotNull
    @NotBlank
    private String password;
    @Enumerated(EnumType.STRING)
    @NotNull
    private UserType role;
    @Min(value = 0,message = "Min of days off is 0")
    @Max(value=20,message = "Max of days off is 20")
    private Integer DaysOff;
    @JsonIgnore
    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "user",
            orphanRemoval = true

    )
    private List<TimeSheet> vacationRequests;
}

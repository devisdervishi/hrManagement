package hrManagement.hrManagement.dto.userDto;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

@Data
@Builder
public class SaveUserRequestDto {

    private String firstName;

    private String lastName;

    private String username;

    private String password;
}

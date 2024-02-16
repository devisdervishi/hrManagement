package hrManagement.hrManagement.dto.userDto;

import lombok.Builder;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.util.Date;

@Data
@Builder
public class UpdateUserRequestDto {
    private String firstName;
    private String lastName;
    private String username;

}


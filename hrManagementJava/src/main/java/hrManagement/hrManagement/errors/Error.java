package hrManagement.hrManagement.errors;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
@AllArgsConstructor
public class Error {
    private String messagge;
    private HttpStatus status;
    private String url;
}

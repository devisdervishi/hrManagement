package hrManagement.hrManagement.exceptions;

import org.springframework.http.HttpStatus;

public class EntityNotFoundException extends Exception{
    public EntityNotFoundException() {
        super();
    }

    public EntityNotFoundException(String message) {
        super(message);
    }
}

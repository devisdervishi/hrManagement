package hrManagement.hrManagement.errorHandlers;

import hrManagement.hrManagement.errors.Error;
import hrManagement.hrManagement.exceptions.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


@ControllerAdvice
public class EntityNotFoundExceptionController extends ResponseEntityExceptionHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<Error> entityNotFound(EntityNotFoundException exception, WebRequest request) {

        Error errorMessage = new Error(exception.getMessage(), HttpStatus.NOT_FOUND,
                ((ServletWebRequest) request).getRequest().getRequestURL().toString());
        return ResponseEntity.status(errorMessage.getStatus()).body(errorMessage);
    }
}


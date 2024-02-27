package hrManagement.hrManagement.errorHandlers;

import hrManagement.hrManagement.errors.Error;
import hrManagement.hrManagement.exceptions.CommonException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class CommonExceptionController {
    @ExceptionHandler(CommonException.class)
    public ResponseEntity<Error> commonError(CommonException exception, WebRequest request) {
        Error errorMessage = new Error(exception.getMessage(), HttpStatus.BAD_REQUEST,
                ((ServletWebRequest) request).getRequest().getRequestURL().toString());
        return ResponseEntity.status(errorMessage.getStatus()).body(errorMessage);
    }
}

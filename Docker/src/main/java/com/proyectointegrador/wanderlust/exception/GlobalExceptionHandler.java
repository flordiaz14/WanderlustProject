package com.proyectointegrador.wanderlust.exception;



import com.proyectointegrador.wanderlust.model.ErrorResponseDto;
import com.proyectointegrador.wanderlust.model.ErrorsResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class GlobalExceptionHandler {

 //private static final Logger logger = Logger.getLogger(GlobalExceptionHandler.class);

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy hh:mm:ss");

   @ExceptionHandler(Exception.class)
    public ResponseEntity<?> responseErrors(Exception e, WebRequest w) {
    //logger.error(e.getMessage());
        return new ResponseEntity("El servidor no pudo procesar la petición.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({ResourceNotFoundException.class})
    public ResponseEntity<ErrorResponseDto> processNotFoundError(ResourceNotFoundException exception){
    //logger.error(ex.getMessage());
        ErrorResponseDto errorResponse = new ErrorResponseDto(
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                LocalDateTime.now().format(formatter)
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorResponseDto> handleEmailAlreadyExistsException(EmailAlreadyExistsException exception){
        ErrorResponseDto errorResponse = new ErrorResponseDto(
                HttpStatus.CONFLICT.value(),
                exception.getMessage(),
                LocalDateTime.now().format(formatter)
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

   @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleUsernameAlreadyExistsException(UsernameNotFoundException exception){
        ErrorResponseDto errorResponse = new ErrorResponseDto(
                HttpStatus.CONFLICT.value(),
                exception.getMessage(),
                LocalDateTime.now().format(formatter)
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorsResponseDto> handleValidateExceptions(MethodArgumentNotValidException exception){
        Map<String, String> errors =new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        ErrorsResponseDto errorsResponse = new ErrorsResponseDto(
                HttpStatus.CONFLICT.value(),
                errors,
                LocalDateTime.now().format(formatter)
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorsResponse);
    }

    @ExceptionHandler(ArrayIndexOutOfBoundsException.class)
    public ResponseEntity<ErrorResponseDto> handleArrayIndexOutOfBoundsException(ArrayIndexOutOfBoundsException exception){
        ErrorResponseDto errorResponse = new ErrorResponseDto(
                HttpStatus.CONFLICT.value(),
                exception.getMessage(),
                LocalDateTime.now().format(formatter)
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

}

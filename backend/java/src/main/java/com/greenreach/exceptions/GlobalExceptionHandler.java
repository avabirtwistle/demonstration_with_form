package com.greenreach.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    /*@ExceptionHandler(RackNotFoundException.class)
    public ResponseEntity<Map<String, String>> handleRackNotFound(RackNotFoundException ex) {
        return new ResponseEntity<>(Map.of("error", ex.getMessage()), HttpStatus.NOT_FOUND);
    }
*/
    // TODO: Add other @ExceptionHandler methods as needed
}


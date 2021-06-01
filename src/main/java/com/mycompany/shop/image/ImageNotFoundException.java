package com.mycompany.shop.image;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ImageNotFoundException extends RuntimeException{

    public ImageNotFoundException(String exception) {
        super(exception);
    }
}

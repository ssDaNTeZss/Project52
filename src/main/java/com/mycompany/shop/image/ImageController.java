package com.mycompany.shop.image;

import com.mycompany.shop.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private ProductRepository productRepository;
    private ImageRepository imageRepository;

    @Autowired
    public ImageController(ProductRepository productRepository, ImageRepository imageRepository) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<Image>> retrieveAllImages() {

        return ResponseEntity.ok(imageRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Image> retrieveImage(@PathVariable long id) {

        Optional<Image> optionalImage = imageRepository.findById(id);

        if (optionalImage.isEmpty()) {
            throw new ImageNotFoundException("The image with id: " + id + " is not found");
        }

        return ResponseEntity.ok(optionalImage.get());
    }
}

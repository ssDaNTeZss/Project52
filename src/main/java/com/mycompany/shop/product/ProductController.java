package com.mycompany.shop.product;

import com.mycompany.shop.image.ImageRepository;
import com.mycompany.shop.techspec.TechSpecRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductRepository productRepository;
    private ImageRepository imageRepository;
    private TechSpecRepository techSpecRepository;

    @Autowired
    public ProductController(ProductRepository productRepository, ImageRepository imageRepository,
                             TechSpecRepository techSpecRepository) {
        this.productRepository = productRepository;
        this.imageRepository = imageRepository;
        this.techSpecRepository = techSpecRepository;
    }

    @GetMapping()
    public ResponseEntity<List<Product>> retrieveAllProducts(@RequestParam("category") String category) {
        List<Product> products = productRepository.findAll().stream().filter(product ->
                product.getCategory().equals(category)).collect(Collectors.toList());
        if (products.size() != 0) {
            return ResponseEntity.ok(products);
        } else {
            throw new ProductNotFoundException("Category is invalid! No products were found!");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> retrieveProduct(@PathVariable long id) {

        Optional<Product> optionalProduct = productRepository.findById(id);

        if (optionalProduct.isEmpty()) {
            throw new ProductNotFoundException("The product with id: " + id + " is not found");
        }

        return ResponseEntity.ok(optionalProduct.get());
    }
}

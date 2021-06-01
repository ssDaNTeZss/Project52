package com.mycompany.shop.techspec;

import com.mycompany.shop.product.Product;
import com.mycompany.shop.product.ProductNotFoundException;
import com.mycompany.shop.product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/techspecs")
public class TechSpecController {

    private ProductRepository productRepository;
    private TechSpecRepository techSpecRepository;

    @Autowired
    public TechSpecController(ProductRepository productRepository, TechSpecRepository techSpecRepository) {
        this.productRepository = productRepository;
        this.techSpecRepository = techSpecRepository;
    }

    @GetMapping("/")
    public ResponseEntity<List<TechSpec>> retrieveAllTechSpecs() {

        return ResponseEntity.ok(techSpecRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TechSpec> retrieveTechSpec(@PathVariable long id) {

        Optional<TechSpec> optionalTechSpec = techSpecRepository.findById(id);

        if (optionalTechSpec.isEmpty()) {
            throw new TechSpecNotFoundException("The techspec with id: " + id + " is not found");
        }

        return ResponseEntity.ok(optionalTechSpec.get());
    }
}

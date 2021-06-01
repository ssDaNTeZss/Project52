package com.mycompany.shop.image;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mycompany.shop.product.Product;

import javax.persistence.*;

@Entity
public class Image {

    @Id
    @GeneratedValue
    private Long id;

    private String imageLink;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private Product product;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImageLink() {
        return imageLink;
    }

    public void setImageLink(String image) {
        this.imageLink = image;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}

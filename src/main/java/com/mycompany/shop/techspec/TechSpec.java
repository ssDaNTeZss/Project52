package com.mycompany.shop.techspec;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mycompany.shop.product.Product;

import javax.persistence.*;

@Entity
public class TechSpec {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private String value;

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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}

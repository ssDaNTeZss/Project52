package com.mycompany.shop.item;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mycompany.shop.basket.Basket;
import com.mycompany.shop.product.Product;

import javax.persistence.*;

@Entity
public class Item {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    private Product product;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "basket_id", nullable = false)
    @JsonBackReference
    private Basket basket;

    public Item() {}

    public Item(Product product) {
        this.product = product;
    }

    public Item(Long id, Product product) {
        this.id = id;
        this.product = product;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Basket getBasket() {
        return basket;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
    }
}

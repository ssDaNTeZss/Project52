package com.mycompany.shop.product;

import com.mycompany.shop.image.Image;
import com.mycompany.shop.techspec.TechSpec;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Product {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    private BigDecimal rating;

    private Integer popularity;

    private String config;

    private Integer price;

    private String img;

    private String description;

    private String brand;

    private String category;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product", fetch = FetchType.EAGER)
    private Set<Image> images = new HashSet<>();

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product", fetch = FetchType.EAGER)
    private Set<TechSpec> techSpec = new HashSet<>();

    public Product(String name, BigDecimal rating, Integer popularity, String config, Integer price,
                   String img, String description, String brand, String category) {
        this.name = name;
        this.rating = rating;
        this.popularity = popularity;
        this.config = config;
        this.price = price;
        this.img = img;
        this.description = description;
        this.brand = brand;
        this.category = category;
    }

    public Product(Long id, String name, BigDecimal rating, Integer popularity, String config, Integer price, String img,
                   String description, String brand, String category) {
        this.id = id;
        this.name = name;
        this.rating = rating;
        this.popularity = popularity;
        this.config = config;
        this.price = price;
        this.img = img;
        this.description = description;
        this.brand = brand;
        this.category = category;
    }

    public Product() {
    }

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

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public Integer getPopularity() {
        return popularity;
    }

    public void setPopularity(Integer popularity) {
        this.popularity = popularity;
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String description) {
        this.config = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Set<Image> getImages() {
        return images;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setImages(Set<Image> images) {
        this.images = images;

        for (Image image: images) {
            image.setProduct(this);
        }
    }

    public Set<TechSpec> getTechSpec() {
        return techSpec;
    }

    public void setTechSpec(Set<TechSpec> techSpecs) {
        this.techSpec = techSpecs;

        for (TechSpec techSpec: techSpecs) {
            techSpec.setProduct(this);
        }
    }
}

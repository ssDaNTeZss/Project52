package com.mycompany.shop.basket;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BasketRepository  extends JpaRepository<Basket, Long> {
    Optional<Basket> findBasketByUserId(Long userId);
}

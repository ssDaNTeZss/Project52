package com.mycompany.shop.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Optional<List<Item>> findAllByBasketId(Long basketId);
    void deleteAllByBasketId(Long basketId);
}

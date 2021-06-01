package com.mycompany.shop.basket;

import com.mycompany.shop.item.Item;
import com.mycompany.shop.item.ItemNotFoundException;
import com.mycompany.shop.item.ItemRepository;
import com.mycompany.shop.product.Product;
import com.mycompany.shop.product.ProductNotFoundException;
import com.mycompany.shop.product.ProductRepository;
import com.mycompany.shop.user.UserRepository;
import com.mycompany.shop.user.UserSessionBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/basket")
public class BasketController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BasketRepository basketRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ItemRepository itemRepository;

    @Autowired
    BasketSessionBean basketSessionBean;

    @Autowired
    UserSessionBean userSessionBean;

    static class CreateBasketRequest {
        Long id;

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }
    }

    @GetMapping
    public ResponseEntity<Basket> getBasket() {
        return ResponseEntity.ok(basketSessionBean.getBasket());
    }

    @PostMapping
    public ResponseEntity<Basket> addToBasket(@RequestBody CreateBasketRequest createBasketRequest) {
        Basket basket;
        Optional<Product> existingProduct = productRepository.findById(createBasketRequest.getId());
        if (existingProduct.isPresent()) {
            if (basketSessionBean.getBasket() == null) {
                basket = new Basket();
                if (userSessionBean.getUser() != null) {
                    basket.setUserId(userSessionBean.getUser().getId());
                }
                basketRepository.save(basket);
            } else {
                basket = basketSessionBean.getBasket();
            }
            Item item = new Item();
            item.setProduct(existingProduct.get());
            item.setBasket(basket);
            itemRepository.save(item);
            List<Item> items = itemRepository.findAllByBasketId(basket.getId()).get();
            basket.setItems(items);
            basket.recalculateTotalPrice();
            basketRepository.save(basket);
            basketSessionBean.setBasket(basket);
            return ResponseEntity.ok(basket);
        } else {
            throw new ProductNotFoundException("The product with id: " + createBasketRequest.getId() + " is not found");
        }
    }

    @Transactional
    @DeleteMapping("/clear")
    public void clearBasket() {
        Basket basket = basketSessionBean.getBasket();
        if (basket != null) {
            itemRepository.deleteAllByBasketId(basket.getId());
            basketRepository.delete(basket);
            basketSessionBean.setBasket(null);
        }
    }

    @Transactional
    @DeleteMapping("/removeitem/{id}")
    public ResponseEntity<Basket> removeItem(@PathVariable long id) {
        if (itemRepository.findById(id).isPresent()) {
            Basket basket = basketSessionBean.getBasket();
            List<Item> items = itemRepository.findAllByBasketId(basket.getId()).get();
            items = items.stream().filter(item1 -> item1.getId() != id).collect(Collectors.toList());
            if (items.size() == 0) {
                itemRepository.deleteAllByBasketId(basket.getId());
                basketRepository.delete(basket);
                basketSessionBean.setBasket(null);
            } else {
                itemRepository.deleteById(id);
                basket.setItems(items);
                basket.recalculateTotalPrice();
                basketRepository.save(basket);
            }
            return ResponseEntity.ok(basketSessionBean.getBasket());
        } else {
            throw new ItemNotFoundException("The item with id: " + id + " is not found");
        }
    }

}

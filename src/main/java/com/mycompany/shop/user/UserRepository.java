package com.mycompany.shop.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    @Query("select case when count(u) > 0 then true else false end from User u where lower(u.username) = lower(:username)")
    Boolean existsByUsername(@Param("username") String username);
}

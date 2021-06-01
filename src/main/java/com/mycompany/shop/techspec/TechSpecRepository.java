package com.mycompany.shop.techspec;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechSpecRepository extends JpaRepository<TechSpec, Long> {
}

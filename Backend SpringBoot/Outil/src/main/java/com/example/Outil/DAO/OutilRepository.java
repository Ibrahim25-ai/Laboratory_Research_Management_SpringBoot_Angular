package com.example.Outil.DAO;

import com.example.Outil.Entities.Outil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OutilRepository extends JpaRepository<Outil, Long> {
    Outil findBySource(String source);

    List<Outil> findBySourceStartingWith(String source);

}
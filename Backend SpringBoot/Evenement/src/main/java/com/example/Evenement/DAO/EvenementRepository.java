package com.example.Evenement.DAO;

import com.example.Evenement.Entities.Evenement;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

//@RepositoryRestController
public interface EvenementRepository extends JpaRepository<Evenement, Long> {
    Evenement findByTitre(String titre);

    List<Evenement> findByTitreStartingWith(String titre);

    List<Evenement> findByLieu(String lieu);
}
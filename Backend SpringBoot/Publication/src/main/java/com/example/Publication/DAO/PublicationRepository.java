package com.example.Publication.DAO;

import com.example.Publication.Entities.Publication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PublicationRepository extends JpaRepository<Publication, Long> {
    Publication findByTitre(String titre);

    List<Publication> findByTitreStartingWith(String titre);

    List<Publication> findByType(String type);
    List<Publication> findByLien(String lien);
}
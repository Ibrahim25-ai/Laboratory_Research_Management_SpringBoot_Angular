package com.example.Membre.DAO;

import com.example.Membre.Entities.EnseignantChercheur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

import java.util.List;
@RepositoryRestController
public interface EnseignantChercheurRepository extends
        JpaRepository<EnseignantChercheur, Long> {
    List<EnseignantChercheur> findByGrade(String grade);

    List<EnseignantChercheur> findByEtablissement(String etablissement);
}
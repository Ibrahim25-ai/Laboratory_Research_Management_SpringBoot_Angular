package com.example.Membre.DAO;

import com.example.Membre.Entities.EnseignantChercheur;
import com.example.Membre.Entities.Etudiant;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.webmvc.RepositoryRestController;

import java.util.Date;
import java.util.List;
@RepositoryRestController
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    /*public List<Etudiant> findByNom(String name);
    public Page<Etudiant> findByNom(String name, Pageable pageable);
    @Query("select e from Etudiant e where e.Nom like :x")
    public List<Etudiant> chercher(@Param("x") String mc);
    @Query("select e from Etudiant e where e.Date > :x and e.Date < :y")
    public List<Etudiant> findByMc(@Param("x") Date date1, @Param("y")Date date2);*/
    List<Etudiant>findByDiplome(String diplome);
    List<Etudiant>findBySujet(String sujet);
    List<Etudiant>findByDiplomeOrderByDateInscriptionDesc(String diplome);

    List<Etudiant>findEtudiantsByEncadrant(EnseignantChercheur enseignantChercheur);

}

package com.example.Membre.DAO;

import com.example.Membre.Bean.PublicationBean;
import com.example.Membre.Entities.Membre;
import com.example.Membre.Entities.Membre_Pub_Id;
import com.example.Membre.Entities.Membre_Publication;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;
@RepositoryRestResource
public interface MembrePubRepository extends
        JpaRepository<Membre_Publication, Membre_Pub_Id> {
    List<Membre_Publication> findByAuteur(Membre auteur);
    List<Membre_Publication> findAll();

    @Override
    Membre_Publication getById(Membre_Pub_Id membrePubId);

    @Override
    List<Membre_Publication> findAllById(Iterable<Membre_Pub_Id> membrePubIds);

    @Override
    void delete(Membre_Publication entity);

}
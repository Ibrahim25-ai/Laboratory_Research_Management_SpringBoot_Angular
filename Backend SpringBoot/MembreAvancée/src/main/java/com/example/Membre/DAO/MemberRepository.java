package com.example.Membre.DAO;

import com.example.Membre.Entities.Membre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;

import java.util.List;
@RepositoryRestController
public interface MemberRepository extends JpaRepository<Membre, Long> {
    Membre findByCin(String cin);

    List<Membre> findByNomStartingWith(String caractere);

    Membre findByEmail(String email);
}
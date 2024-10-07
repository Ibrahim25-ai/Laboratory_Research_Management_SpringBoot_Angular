package com.example.Evenement.Service;

import com.example.Evenement.DAO.EvenementRepository;
import com.example.Evenement.Entities.Evenement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EvenementImpl implements EvenementService {
    @Autowired
    EvenementRepository evenementRepository;

    public Evenement addEvenement(Evenement e) {
        evenementRepository.save(e);
        return e;
    }

    public void deleteEvenement(Long id) {
        evenementRepository.deleteById(id);
    }

    public Evenement updateEvenement(Evenement e) {
        return evenementRepository.saveAndFlush(e);
    }

    public Evenement findEvenement(Long id) {
        Evenement p = (Evenement) evenementRepository.findById(id).get();
        return p;
    }

    public List<Evenement> findAll() {
        return evenementRepository.findAll();
    }

    public Evenement findByTitre(String titre) {
        return evenementRepository.findByTitre(titre);
    }


    public List<Evenement> findByTitreStartingWith(String titre) {
        return evenementRepository.findByTitreStartingWith(titre);
    }

    public List<Evenement> findByLieu(String lieu) {
        return evenementRepository.findByLieu(lieu);
    }

}

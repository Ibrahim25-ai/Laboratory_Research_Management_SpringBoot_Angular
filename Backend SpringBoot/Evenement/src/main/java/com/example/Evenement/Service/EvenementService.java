package com.example.Evenement.Service;


import com.example.Evenement.Entities.Evenement;

import java.util.List;

public interface EvenementService {
    public Evenement addEvenement(Evenement e);

    public void deleteEvenement(Long id);

    public Evenement updateEvenement(Evenement e);

    public Evenement findEvenement(Long id);

    public List<Evenement> findAll();

    public Evenement findByTitre(String titre);

    public List<Evenement> findByTitreStartingWith(String titre);

    public List<Evenement> findByLieu(String lieu);

}

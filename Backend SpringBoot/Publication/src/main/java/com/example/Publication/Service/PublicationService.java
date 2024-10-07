package com.example.Publication.Service;


import com.example.Publication.Entities.Publication;

import java.util.List;

public interface PublicationService {
    public Publication addPublication(Publication p);

    public void deletePublication(Long id);

    public Publication updatePublication(Publication p);

    public Publication findPublication(Long id);

    public List<Publication> findAll();

    public Publication findByTitre(String titre);

    public List<Publication> findByType(String type);

    public List<Publication> findByTitreStartingWith(String titre);

    public List<Publication> findByLien(String lien);

}

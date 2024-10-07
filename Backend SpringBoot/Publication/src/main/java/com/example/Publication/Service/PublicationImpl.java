package com.example.Publication.Service;

import com.example.Publication.DAO.PublicationRepository;
import com.example.Publication.Entities.Publication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PublicationImpl implements PublicationService {
    @Autowired
    PublicationRepository publicationRepository;

    public Publication addPublication(Publication p) {
        publicationRepository.save(p);
        return p;
    }

    public void deletePublication(Long id) {
        publicationRepository.deleteById(id);
    }

    public Publication updatePublication(Publication p) {
        return publicationRepository.saveAndFlush(p);
    }

    public Publication findPublication(Long id) {
        Publication p = (Publication) publicationRepository.findById(id).get();
        return p;
    }

    public List<Publication> findAll() {
        return publicationRepository.findAll();
    }

    public Publication findByTitre(String titre) {
        return publicationRepository.findByTitre(titre);
    }

    public List<Publication> findByType(String type) {
        return publicationRepository.findByType(type);
    }

    public List<Publication> findByTitreStartingWith(String titre) {
        return publicationRepository.findByTitreStartingWith(titre);
    }

    public List<Publication> findByLien(String lien) {
        return publicationRepository.findByLien(lien);
    }

}

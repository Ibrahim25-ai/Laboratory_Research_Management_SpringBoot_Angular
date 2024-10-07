package com.example.Outil.Service;

import com.example.Outil.DAO.OutilRepository;
import com.example.Outil.Entities.Outil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OutilImpl implements OutilService {
    @Autowired
    OutilRepository outilRepository;

    public Outil addOutil(Outil o) {
        outilRepository.save(o);
        return o;
    }

    public void deleteOutil(Long id) {
        outilRepository.deleteById(id);
    }

    public Outil updateOutil(Outil o) {
        return outilRepository.saveAndFlush(o);
    }

    public Outil findOutil(Long id) {
        Outil o = (Outil) outilRepository.findById(id).get();
        return o;
    }

    public List<Outil> findAll() {
        return outilRepository.findAll();
    }

    public List<Outil> findBySourceStartingWith(String source) {
        return outilRepository.findBySourceStartingWith(source);
    }

    public Outil findBySource(String source) {
        return outilRepository.findBySource(source);
    }
}

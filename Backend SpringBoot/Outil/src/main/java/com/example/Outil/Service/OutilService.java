package com.example.Outil.Service;


import com.example.Outil.Entities.Outil;

import java.util.List;

public interface OutilService {
    public Outil addOutil(Outil p);

    public void deleteOutil(Long id);

    public Outil updateOutil(Outil o);

    public Outil findOutil(Long id);

    public List<Outil> findAll();
    public Outil findBySource(String source);

    public List<Outil> findBySourceStartingWith(String source);


}

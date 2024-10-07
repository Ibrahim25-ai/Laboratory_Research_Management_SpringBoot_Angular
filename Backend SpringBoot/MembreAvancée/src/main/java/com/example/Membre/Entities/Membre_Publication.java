package com.example.Membre.Entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Membre_Publication {
    @EmbeddedId
    private Membre_Pub_Id id;
    @ManyToOne
    @MapsId("auteur_id")
    private Membre auteur;
}
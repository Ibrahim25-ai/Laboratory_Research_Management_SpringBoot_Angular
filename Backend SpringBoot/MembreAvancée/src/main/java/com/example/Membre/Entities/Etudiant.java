package com.example.Membre.Entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("etd")
public class Etudiant extends Membre {
    @NonNull
    @Temporal(TemporalType.DATE)
    private Date dateInscription;
    @NonNull
    private String diplome;
    @NonNull
    private String sujet;
    @ManyToOne
    private EnseignantChercheur encadrant;

    @Builder
    public Etudiant(@NonNull String Cin, @NonNull String Nom, @NonNull String Prenom, java.util.@NonNull Date Date, @NonNull byte[] Photo, @NonNull String Cv, @NonNull String Email, @NonNull String Password, @NonNull Date dateInscription, @NonNull String diplome, @NonNull String Sujet, EnseignantChercheur encadrant) {
        super(Cin, Nom, Prenom, Date, Cv, Email, Password);
        //Photo
        dateInscription = dateInscription;
        diplome = diplome;
        sujet = Sujet;
        this.encadrant = encadrant;
    }
}

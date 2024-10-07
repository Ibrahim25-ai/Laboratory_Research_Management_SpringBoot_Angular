package com.example.Membre.Entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("ens")
public class EnseignantChercheur extends Membre {
    @NonNull
    private String grade;
    @NonNull
    private String etablissement;

    @Builder
    public EnseignantChercheur(@NonNull String Cin, @NonNull String Nom, @NonNull String Prenom, java.util.@NonNull Date Date, @NonNull byte[] Photo, @NonNull String Cv, @NonNull String Email, @NonNull String Password, @NonNull String grade, @NonNull String etablissement) {
        super(Cin, Nom, Prenom, Date, Cv, Email, Password);
        //Photo
        grade = grade;
        etablissement = etablissement;
    }
}

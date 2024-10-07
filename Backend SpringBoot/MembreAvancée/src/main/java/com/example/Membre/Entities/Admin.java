package com.example.Membre.Entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("adm")
public class Admin extends Membre {
    @Builder
    public Admin(@NonNull String Cin, @NonNull String Nom, @NonNull String Prenom, java.util.@NonNull Date Date, @NonNull byte[] Photo, @NonNull String Cv, @NonNull String Email, @NonNull String Password, @NonNull String grade, @NonNull String etablissement) {
        super(Cin, Nom, Prenom, Date, Cv, Email, Password);
    }
}

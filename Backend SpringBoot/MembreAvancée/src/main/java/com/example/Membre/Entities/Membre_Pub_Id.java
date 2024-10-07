package com.example.Membre.Entities;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Membre_Pub_Id implements Serializable {
    private Long publication_id;
    private Long auteur_id;
}
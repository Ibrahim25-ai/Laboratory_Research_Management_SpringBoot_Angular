package com.example.Membre.Bean;

import com.example.Membre.Entities.Membre;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Transient;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Collection;
import java.util.Date;
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicationBean{
    private long Id;
    private String type;
    private String titre;
    private String lien;
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern="yyyy-mm-dd")
    private Date date;
    private String sourcepdf;
    @Transient
    Collection<Membre> members;
}


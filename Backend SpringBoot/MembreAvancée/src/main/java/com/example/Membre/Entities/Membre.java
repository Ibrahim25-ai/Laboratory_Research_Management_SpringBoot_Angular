package com.example.Membre.Entities;

import com.example.Membre.Bean.PublicationBean;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;


@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="type_mbr",discriminatorType = DiscriminatorType.STRING,length = 3)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
//@Table(name = "membre")
public abstract class Membre implements Serializable {
    @Id
    @Column(name = "Id", length = 50)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    @NonNull
    private String cin;
    @NonNull
    private String nom;
    @NonNull
    private String prenom;
    @NonNull
    @Temporal(TemporalType.DATE)
    @DateTimeFormat(pattern="yyyy-mm-dd")
    private Date date;
    //@NonNull
    //private byte[] photo;
    @NonNull
    private String cv;
    private String role;
    @NonNull
    private String email;
    @NonNull
    private String password;
    @Transient
    Collection<PublicationBean> pubs;

}

package com.example.Membre.Service;

import com.example.Membre.Bean.PublicationBean;
import com.example.Membre.Entities.EnseignantChercheur;
import com.example.Membre.Entities.Etudiant;
import com.example.Membre.Entities.Membre;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface MemberService {
    public Membre addMember(Membre m);

    public void deleteMember(Long id);

    public Membre updateMember(Membre p);

    public Membre findMember(Long id);

    public List<Membre> findAll();

    public List<Etudiant> findAllEtudiants();

    public List<EnseignantChercheur> findAllEnseignantChercheurs();

    public Membre findByCin(String cin);

    public Membre findByEmail(String email);

    public List<Membre> findByNom(String nom);

    public List<Etudiant> findByDiplome(String diplome);

    List<Etudiant> findByDiplomeOrderByDate(String diplome);

    public List<EnseignantChercheur> findByGrade(String grade);

    public List<EnseignantChercheur> findByEtablissement(String etablissement);

    public void affecterEtudiantEnseignant(long id_etd, long id_ens);

    public List<Etudiant> findEtudiantByEncadrant(EnseignantChercheur enseignantChercheur);

    public void affecterauteurTopublication(Long idauteur, Long idpub);

    public List<PublicationBean>
    findPublicationparauteur(Long idauteur);

    public List<PublicationBean> findPublications();

    public PublicationBean addPublicationBean(PublicationBean p);

    public void deleteMemberPub(Long id);
    public void desaffectMemberPub(Long idauteur,Long id_pub) ;

    public ResponseEntity login(Map<String, String> requestMap);
    public ResponseEntity<Map<String, Object>> getCount();
    ResponseEntity<String> changePassword(Map<String, String> requestMap);

}

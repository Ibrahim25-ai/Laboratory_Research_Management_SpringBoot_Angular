package com.example.Membre.Service;

import com.example.Membre.Bean.PublicationBean;
import com.example.Membre.DAO.*;
import com.example.Membre.Entities.*;
import com.example.Membre.JWT.JwtFilter;
import com.example.Membre.JWT.JwtUtil;
import com.example.Membre.Proxies.PublicationService;
import com.example.Membre.Utils.MemberUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@Slf4j
@Service
public class IMemberImpl implements MemberService {
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    EtudiantRepository etudiantRepository;
    @Autowired
    EnseignantChercheurRepository enseignantChercheurRepository;
    @Autowired
    MembrePubRepository membrepubrepository;
    @Autowired
    PublicationService proxy;

    public Membre addMember(Membre m) {
        memberRepository.save(m);
        return m;
    }

    public void deleteMember(Long id) {
        memberRepository.deleteById(id);
    }

    public Membre updateMember(Membre m) {
        return memberRepository.saveAndFlush(m);
    }

    public Membre findMember(Long id) {
        Membre m = (Membre) memberRepository.findById(id).get();
        return m;
    }

    public List<Membre> findAll() {
        return memberRepository.findAll();
    }

    public List<Etudiant> findAllEtudiants() {
        return etudiantRepository.findAll();
    }

    public List<EnseignantChercheur> findAllEnseignantChercheurs() {
        return enseignantChercheurRepository.findAll();
    }

    public Membre findByCin(String cin) {
        return memberRepository.findByCin(cin);
    }

    public Membre findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public List<Membre> findByNom(String nom) {
        return memberRepository.findByNomStartingWith(nom);
    }

    public List<Etudiant> findByDiplome(String diplome) {
        return etudiantRepository.findByDiplome(diplome);
    }

    public List<Etudiant> findByDiplomeOrderByDate(String diplome) {
        return etudiantRepository.findByDiplomeOrderByDateInscriptionDesc(diplome);
    }

    public List<EnseignantChercheur> findByGrade(String grade) {
        return enseignantChercheurRepository.findByGrade(grade);
    }

    public List<EnseignantChercheur> findByEtablissement(String etablissement) {
        return enseignantChercheurRepository.findByEtablissement(etablissement);
    }

    public void affecterEtudiantEnseignant(long id_etd, long id_ens) {
        etudiantRepository.findById(id_etd).get().setEncadrant(enseignantChercheurRepository.findById(id_ens).get());
        System.out.println("Etudiant: " + id_etd + " encadrant: " + id_ens + enseignantChercheurRepository.findById(id_ens).get().getNom());
    }

    public List<Etudiant> findEtudiantByEncadrant(EnseignantChercheur enseignantChercheur) {
        return etudiantRepository.findEtudiantsByEncadrant(enseignantChercheur);
    }

    public void affecterauteurTopublication(Long idauteur, Long idpub) {
        Membre mbr = memberRepository.findById(idauteur).get();
        Membre_Publication mbs = new Membre_Publication();
        mbs.setAuteur(mbr);
        mbs.setId(new Membre_Pub_Id(idpub, idauteur));
        membrepubrepository.save(mbs);
    }

    public List<PublicationBean> findPublicationparauteur(Long idauteur) {
        List<PublicationBean> pubs = new ArrayList<>();
        Membre auteur = memberRepository.findById(idauteur).get();
        List<Membre_Publication>
                idpubs = membrepubrepository.findByAuteur(auteur);
        idpubs.forEach(s -> {
                    System.out.println(s);
                    pubs.add(proxy.findPublicationById(s.getId().getPublication_id()));
                }
        );
        return pubs;
    }

    public List<PublicationBean> findPublications() {
        List<PublicationBean> pubs = new ArrayList<>();
        List<Membre_Publication>
                idpubs = membrepubrepository.findAll();
        idpubs.forEach(s -> {
                    //System.out.println(s);
                    PublicationBean pub = proxy.findPublicationById(s.getId().getPublication_id());
                    pub.setMembers(findMembersByPublication(s.getId()));
                    pubs.add(pub);
                }
        );
        return pubs;
    }

    public List<Membre> findMembersByPublication(Membre_Pub_Id mem) {
        List<Membre> members = new ArrayList<>();
        /*List< Membre_Publication> idmembers=membrepubrepository.findAll();
        idmembers.forEach(s->{
            System.out.println(s);
            members.add(memberRepository.findById(s.getId().getAuteur_id()).get());
        }
        );*/
        Membre_Publication memberMembrePublication = membrepubrepository.getById(mem);
        members.add(memberRepository.findById(memberMembrePublication.getId().getAuteur_id()).get());
        return members;
    }

    public PublicationBean addPublicationBean(PublicationBean p) {
        List<Membre> listMem = (List<Membre>) p.getMembers();
        listMem.forEach(m -> {
            affecterauteurTopublication(m.getId(), p.getId());
        });
        //addPublicationTomempub(p.getId());
        return proxy.addPublication(p);
    }

    public void deleteMemberPub(Long id_pub) {
        List<Membre_Publication>
                idpubs = membrepubrepository.findAll();
        idpubs.forEach(s -> {
            //System.out.println(s);
            if (s.getId().getPublication_id() == id_pub) {
                membrepubrepository.deleteById(s.getId());
            }
        });
    }
    public void desaffectMemberPub(Long idauteur,Long id_pub) {
        List<Membre_Publication>
                idpubs = membrepubrepository.findAll();
        idpubs.forEach(s -> {
            //System.out.println(s);
            if (s.getId().getPublication_id() == id_pub && s.getId().getAuteur_id() == idauteur) {
                membrepubrepository.deleteById(s.getId());
            }
        });
    }
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtil jwtUtil;
    @Autowired
    JwtFilter jwtFilter;
    public ResponseEntity login(Map<String, String> requestMap) {
        //log.info("Inside login {}", requestMap);
        try {
            //System.out.println(requestMap.get("email") + requestMap.get("password"));
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password")));
            if (auth.isAuthenticated()) {
                System.out.println(requestMap.get("email") + requestMap.get("password") + "bbbbbbbbb");
                return new ResponseEntity<String>("{\"token\":\""  + jwtUtil.generateToken(
                        requestMap.get("email"), findByEmail(requestMap.get("email")).getRole())+ "\"}",HttpStatus.OK);
            }
        } catch (Exception ex) {
            log.error("{}", ex);
        }
        return new ResponseEntity<String>("{\"message\":\"" + "Bad Credentials." + "\"}",
                HttpStatus.BAD_REQUEST);
    }
    public ResponseEntity<Map<String, Object>> getCount() {
        Map<String , Object> map = new HashMap<>();
        map.put("Students" , etudiantRepository.count());
        map.put("Teachers" , enseignantChercheurRepository.count());
        map.put("Publications" , membrepubrepository.count());
        return new ResponseEntity<>(map , HttpStatus.OK);
    }
    public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
        try {
            System.out.println(jwtFilter.getCurrentUsername());
            Membre user = memberRepository.findByEmail(jwtFilter.getCurrentUsername());
            if (!user.equals(null)) {
                if (user.getPassword().equals(requestMap.get("oldPassword"))) {
                    System.out.println(user.getPassword());
                    user.setPassword(requestMap.get("newPassword"));
                    memberRepository.save(user);
                    return MemberUtils.getResponeEntity("Password Updated Successfully", HttpStatus.OK);
                }
                return MemberUtils.getResponeEntity("Incorrect Old Password", HttpStatus.BAD_REQUEST);
            }
            return MemberUtils.getResponeEntity("{\"message\":\"" + "Something went wrong." + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return MemberUtils.getResponeEntity("{\"message\":\"" + "Something went wrong." + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

package com.example.Membre.Controller;

import com.example.Membre.Bean.PublicationBean;
import com.example.Membre.Entities.EnseignantChercheur;
import com.example.Membre.Entities.Etudiant;
import com.example.Membre.Entities.Membre;
import com.example.Membre.Proxies.PublicationService;
import com.example.Membre.Service.MemberService;
import com.example.Membre.Utils.MemberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1")
public class MemberRestController {
    @Autowired
    MemberService memberService;
    @Autowired
    PublicationService publicationService;

    @CrossOrigin(origins = "http://localhost:4200/")
    @RequestMapping(value = "/membres", method = RequestMethod.GET)
    public List<Membre> findMembres() {
        return memberService.findAll();
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping(value = "/membres/etudiants")
    public List<Etudiant> findStudents() {
        return memberService.findAllEtudiants();
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping(value = "/membres/teachers")
    public List<EnseignantChercheur> findTeachers() {
        return memberService.findAllEnseignantChercheurs();
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping(value = "/membres/{id}")
    public Membre findOneMemberById(@PathVariable Long id) {
        return memberService.findMember(id);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value = "/membres/enseignant")
    public Membre addMembre(@RequestBody EnseignantChercheur m) {
        return memberService.addMember(m);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value = "/membres/etudiant")
    public Membre addMembre(@RequestBody Etudiant e) {
        return memberService.addMember(e);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @DeleteMapping(value = "/membres/{id}")
    public void deleteMembre(@PathVariable Long id) {
        memberService.deleteMember(id);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PutMapping(value = "/membres/etudiant/{id}")
    public Membre updatemembre(@PathVariable Long id, @RequestBody Etudiant p) {
        p.setId(id);
        return memberService.updateMember(p);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PutMapping(value = "/membres/enseignant/{id}")
    public Membre updateMembre(@PathVariable Long id, @RequestBody EnseignantChercheur p) {
        p.setId(id);
        return memberService.updateMember(p);
    }

    @GetMapping(value = "/membres/getByEncadtant")
    public List<Etudiant> getByEncadtant(@RequestBody EnseignantChercheur e) {
        return memberService.findEtudiantByEncadrant(e);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value = "/membres/affecterEtudiantEnseignant/{id_etd}/{id_ens}")
    public void affecterEtudiantEnseignant(@PathVariable Long id_etd, @PathVariable Long id_ens) {
        memberService.affecterEtudiantEnseignant(id_etd, id_ens);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/fullmember/{id}")
    public Membre findAFullMember(@PathVariable(name="id") Long id){
        Membre mbr=memberService.findMember(id);
        mbr.setPubs(memberService.findPublicationparauteur(id));
        return mbr;
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping("/fullpubs")
    public List<PublicationBean> findFullPublications(){
        return memberService.findPublications();
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value="/publications/save")
    public PublicationBean addPublication(@RequestBody PublicationBean p)
    {
        return memberService.addPublicationBean(p);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value = "/membres/affecterauteurTopublication/{id_aut}/{id_pub}")
    public void affecterauteurTopublication(@PathVariable Long id_aut, @PathVariable Long id_pub) {
        memberService.affecterauteurTopublication(id_aut, id_pub);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @DeleteMapping(value = "/publications/{id_pub}")
    public void deleteMemberPub(@PathVariable Long id_pub) {
        memberService.deleteMemberPub(id_pub);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @DeleteMapping(value = "/publications/desaffecter/{id_aut}/{id_pub}")
    public void desaffectMemberPub(@PathVariable Long id_aut, @PathVariable Long id_pub) {
        memberService.desaffectMemberPub(id_aut,id_pub);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value = "/membres/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestMap) {
        try {
            return memberService.login(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return MemberUtils.getResponeEntity("Something Went Wrong.", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping(value = "/membres/details")
    public ResponseEntity<Map<String, Object>> getCount() {
        return memberService.getCount();
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value = "/membres/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> requestMap) {
        try {
            return memberService.changePassword(requestMap);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return MemberUtils.getResponeEntity("{\"message\":\"" + "Something went wrong." + "\"}", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
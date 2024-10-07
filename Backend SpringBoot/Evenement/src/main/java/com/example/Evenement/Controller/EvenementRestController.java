package com.example.Evenement.Controller;

import com.example.Evenement.Entities.Evenement;
import com.example.Evenement.Service.EvenementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class EvenementRestController {
    @Autowired
    EvenementService evenementService;
    @RequestMapping(value="/evenements", method= RequestMethod.GET)
    public List<Evenement> findEvenements (){
        return evenementService.findAll();
    }
    @GetMapping(value="/evenements/{id}")
    public Evenement findOneMemberById(@PathVariable Long id){
        return evenementService.findEvenement(id);
    }
    @PostMapping(value="/evenements/save")
    public Evenement addEvenement(@RequestBody Evenement p)
    {
        return evenementService.addEvenement(p);
    }
    @DeleteMapping(value="/evenements/{id}")
    public void deleteEvenement(@PathVariable Long id)
    {
        evenementService.deleteEvenement(id);
    }
    @PutMapping(value="/evenements/update/{id}")
    public Evenement updateEvenement(@PathVariable Long id, @RequestBody Evenement p)
    {
        p.setId(id);
        return evenementService.updateEvenement(p);
    }
}
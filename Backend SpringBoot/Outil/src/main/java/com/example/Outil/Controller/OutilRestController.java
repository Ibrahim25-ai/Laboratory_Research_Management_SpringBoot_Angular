package com.example.Outil.Controller;

import com.example.Outil.Entities.Outil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class OutilRestController {
    @Autowired
    com.example.Outil.Service.OutilService outilService;
    @RequestMapping(value="/outils", method= RequestMethod.GET)
    public List<Outil> findOutils (){
        return outilService.findAll();
    }
    @GetMapping(value="/outils/{id}")
    public Outil findOneMemberById(@PathVariable Long id){
        return outilService.findOutil(id);
    }
    @PostMapping(value="/outils/save")
    public Outil addOutil(@RequestBody Outil p)
    {
        return outilService.addOutil(p);
    }
    @DeleteMapping(value="/outils/{id}")
    public void deleteOutil(@PathVariable Long id)
    {
        outilService.deleteOutil(id);
    }
    @PutMapping(value="/outils/update/{id}")
    public Outil updateOutil(@PathVariable Long id, @RequestBody Outil p)
    {
        p.setId(id);
        return outilService.updateOutil(p);
    }
}
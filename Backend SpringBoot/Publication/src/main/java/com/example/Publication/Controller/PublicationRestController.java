package com.example.Publication.Controller;

import com.example.Publication.Entities.Publication;
import com.example.Publication.Service.PublicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class PublicationRestController {
    @Autowired
    PublicationService publicationService;
    @CrossOrigin(origins = "http://localhost:4200/")
    @RequestMapping(value="/publications", method= RequestMethod.GET)
    public List<Publication> findPublications (){
        return publicationService.findAll();
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @GetMapping(value="/publications/{id}")
    public Publication findPublication(@PathVariable Long id){
        return publicationService.findPublication(id);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PostMapping(value="/publications/save")
    public Publication addPublication(@RequestBody Publication p)
    {
        return publicationService.addPublication(p);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @DeleteMapping(value="/publications/{id}")
    public void deletePublication(@PathVariable Long id)
    {
        publicationService.deletePublication(id);
    }
    @CrossOrigin(origins = "http://localhost:4200/")
    @PutMapping(value="/publications/update/{id}")
    public Publication updatePublication(@PathVariable Long id, @RequestBody Publication p)
    {
        p.setId(id);
        return publicationService.updatePublication(p);
    }
}
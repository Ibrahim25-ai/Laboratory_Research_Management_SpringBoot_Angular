package com.example.Membre.Proxies;

import com.example.Membre.Bean.PublicationBean;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "PUBLICATION-SERVICE")
public interface PublicationService{
    @GetMapping("/publications/{id}")
    public PublicationBean findPublicationById(@PathVariable(name = "id") Long id);
    @GetMapping("/publications")
    public List<PublicationBean> findPublications();

    @PostMapping(value="api/v1/publications/save")
    public PublicationBean addPublication(@RequestBody PublicationBean p);
}
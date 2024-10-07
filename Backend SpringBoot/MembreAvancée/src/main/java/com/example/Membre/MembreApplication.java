package com.example.Membre;

import com.example.Membre.Entities.Etudiant;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

import java.util.Date;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients
public class MembreApplication {

    public static void main(String[] args) {

        SpringApplication.run(MembreApplication.class, args);
    }
}

package com.findmymeds.backend.controller;

import com.findmymeds.backend.model.Civilian;
import com.findmymeds.backend.repository.CivilianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/civilians")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:5174" })
public class CivilianController {

    @Autowired
    private CivilianRepository civilianRepository;

    @GetMapping
    public List<Civilian> getAllCivilians() {
        // In a real app, you might want pagination here
        return civilianRepository.findAll();
    }
}

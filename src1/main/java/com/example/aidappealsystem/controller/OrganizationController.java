package com.example.aidappealsystem.controller;

import com.example.aidappealsystem.model.Organization.LoginRequest;
import com.example.aidappealsystem.model.Organization.LoginResponse;
import com.example.aidappealsystem.model.Organization.Organization;
import com.example.aidappealsystem.model.Organization.OrganizationDetailsResponse;
import com.example.aidappealsystem.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organization")
@CrossOrigin
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @PostMapping("/add")
    public String add(@RequestBody Organization organization){
        try {
            organizationService.saveOrganization(organization);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "New organization added.";
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest){
        List<Organization> organizationList = organizationService.findAll();
        return organizationService.loginOrganization(organizationList, loginRequest);
    }

    @GetMapping("/profile")
    public ResponseEntity getProfile(@RequestParam(name = "id") int id){
        OrganizationDetailsResponse organizationDetailsResponse = organizationService.getOrganizationById(id);
        return ResponseEntity.ok().body(organizationDetailsResponse);
    }

}

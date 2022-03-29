package com.example.aidappealsystem.controller;

import com.example.aidappealsystem.helper.Utilities;
import com.example.aidappealsystem.model.Applications.Application;
import com.example.aidappealsystem.model.Applications.ApplicationRequest;
import com.example.aidappealsystem.model.Applications.ApplicationResponse;
import com.example.aidappealsystem.model.Applications.Document;
import com.example.aidappealsystem.service.ApplicationService;
import com.example.aidappealsystem.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.core.io.Resource;
import java.util.List;

@RestController
@RequestMapping("/application")
@CrossOrigin
public class ApplicationController {

    @Autowired
    ApplicationService applicationService;

    @Autowired
    FileStorageService fileStorageService;

    @PostMapping("/apply")
    public ResponseEntity<String> apply(@ModelAttribute ApplicationRequest applicationRequest) throws Exception {
        try{
            validateApplicationRequest(applicationRequest);
            String message = applicationService.saveApplication(applicationRequest);
            return ResponseEntity.ok().body(message);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/all")
    public List<Application> getAll(){
        return applicationService.getAllApplications();
    }

    @GetMapping("/get/single")
    @ResponseBody
    public ApplicationResponse getApplication(@RequestParam(name = "applicationId") Integer applicationId) {
        return applicationService.getApplicationById(applicationId);
    }

    @GetMapping("/getApplications")
    @ResponseBody
    public List<Application> getApplicationsByAppealId(@RequestParam(name = "appealId") int appealId){
        return applicationService.getApplicationsByAppealId(appealId);
    }

    @GetMapping("/download")
    public ResponseEntity<Resource> downloadFile(@RequestParam(name = "fileId") int fileId){
        Document document = fileStorageService.getFile(fileId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(document.getDocumentType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + document.getDocumentName() + "\"")
                .body(new ByteArrayResource(document.getData()));
    }

    private void validateApplicationRequest(ApplicationRequest applicationRequest) throws Exception {
        if(Utilities.isEmpty(applicationRequest.getAddress()) || Utilities.isEmpty(applicationRequest.getName()) || Utilities.isEmpty(applicationRequest.getIncome()) || Utilities.isEmpty(applicationRequest.getDocument())){
            throw new Exception("Error while processing application.");
        }
    }

}

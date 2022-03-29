package com.example.aidappealsystem.service.Impl;

import com.example.aidappealsystem.model.Applications.Application;
import com.example.aidappealsystem.model.Applications.ApplicationRequest;
import com.example.aidappealsystem.model.Applications.ApplicationResponse;
import com.example.aidappealsystem.model.Applications.Document;
import com.example.aidappealsystem.repository.ApplicationRepository;
import com.example.aidappealsystem.repository.DocumentRepository;
import com.example.aidappealsystem.service.ApplicationService;
import com.example.aidappealsystem.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    DocumentRepository documentRepository;

    @Autowired
    FileStorageService fileStorageService;

    @Override
    public String saveApplication(ApplicationRequest applicationRequest) {
        Document document = fileStorageService.save(applicationRequest.getDocument());
        Application application = new Application();
        application.setName(applicationRequest.getName());
        application.setAddress(applicationRequest.getAddress());
        application.setAppealId(applicationRequest.getAppealId());
        application.setIncome(applicationRequest.getIncome());
        application.setStatus("PENDING");
        application.setDocumentId(document.getDocumentId());
        applicationRepository.save(application);
        return "Application success. Please wait for disbursement.";
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public ApplicationResponse getApplicationById(int id) {
        ApplicationResponse applicationResponse = new ApplicationResponse();
        Application application = applicationRepository.getApplicationById(id);
        applicationResponse.setApplicationId(application.getApplicationId());
        applicationResponse.setName(application.getName());
        applicationResponse.setStatus(application.getStatus());
        applicationResponse.setAddress(application.getAddress());
        applicationResponse.setIncome(application.getIncome());
        applicationResponse.setAppealId(application.getAppealId());
        applicationResponse.setDocumentId(application.getDocumentId());
        Document document = documentRepository.getById(application.getDocumentId());
        applicationResponse.setDocumentName(document.getDocumentName());
        return applicationResponse;
    }

    @Override
    public List<Application> getApplicationsByAppealId(int appealId) {
        return applicationRepository.getApplicationsByAppealId(appealId);
    }
}

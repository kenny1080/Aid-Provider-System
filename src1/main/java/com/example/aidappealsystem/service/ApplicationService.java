package com.example.aidappealsystem.service;

import com.example.aidappealsystem.model.Applications.Application;
import com.example.aidappealsystem.model.Applications.ApplicationRequest;
import com.example.aidappealsystem.model.Applications.ApplicationResponse;

import java.util.List;

public interface ApplicationService {
    public String saveApplication(ApplicationRequest applicationRequest);

    public List<Application> getAllApplications();

    public ApplicationResponse getApplicationById(int id);

    public List<Application> getApplicationsByAppealId(int appealId);
}

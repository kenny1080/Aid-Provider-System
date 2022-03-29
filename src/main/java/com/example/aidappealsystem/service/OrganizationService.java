package com.example.aidappealsystem.service;

import com.example.aidappealsystem.model.Organization.LoginRequest;
import com.example.aidappealsystem.model.Organization.LoginResponse;
import com.example.aidappealsystem.model.Organization.Organization;
import com.example.aidappealsystem.model.Organization.OrganizationDetailsResponse;

import java.util.List;

public interface OrganizationService {
    public Organization saveOrganization(Organization organization) throws Exception;

    public List<Organization> findAll();

    public LoginResponse loginOrganization(List<Organization> organizationList, LoginRequest loginRequest);

    public OrganizationDetailsResponse getOrganizationById(int id);
}

package com.example.aidappealsystem.service.Impl;

import com.example.aidappealsystem.model.Organization.LoginRequest;
import com.example.aidappealsystem.model.Organization.LoginResponse;
import com.example.aidappealsystem.model.Organization.Organization;
import com.example.aidappealsystem.model.Organization.OrganizationDetailsResponse;
import com.example.aidappealsystem.repository.OrganizationRepository;
import com.example.aidappealsystem.service.OrganizationService;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public Organization saveOrganization(Organization organization) throws Exception{
        return organizationRepository.save(organization);
    }

    @Override
    public List<Organization> findAll() {
        return organizationRepository.findAll();
    }

    @Override
    public LoginResponse loginOrganization(List<Organization> organizationList, LoginRequest loginRequest) {
        for (Organization organization : organizationList) {
            if(loginRequest.getUsername().equals(organization.getUsername())){
                if(loginRequest.getPassword().equals(organization.getPassword())){
                    LoginResponse loginResponse = new LoginResponse();
                    loginResponse.setOrganizationId(organization.getOrganizationId());
                    loginResponse.setOrganizationName(organization.getOrganizationName());
                    loginResponse.setOrganizationAddress(organization.getAddress());
                    return loginResponse;
                }
            }
        }
        return null;
    }

    @Override
    public OrganizationDetailsResponse getOrganizationById(int id) {
        Organization organization = organizationRepository.getById(id);
        OrganizationDetailsResponse organizationDetailsResponse = new OrganizationDetailsResponse();
        organizationDetailsResponse.setOrganizationName(organization.getOrganizationName());
        organizationDetailsResponse.setAddress(organization.getAddress());
        organizationDetailsResponse.setOrganizationId(organization.getOrganizationId());
        organizationDetailsResponse.setUsername(organization.getUsername());
        return organizationDetailsResponse;
    }
}

package com.example.aidappealsystem.service.Impl;

import com.example.aidappealsystem.model.Appeal.Appeal;
import com.example.aidappealsystem.model.Appeal.GetAppealResponse;
import com.example.aidappealsystem.model.Organization.Organization;
import com.example.aidappealsystem.repository.AppealRepository;
import com.example.aidappealsystem.repository.OrganizationRepository;
import com.example.aidappealsystem.service.AppealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppealServiceImpl implements AppealService {

    @Autowired
    AppealRepository appealRepository;

    @Autowired
    OrganizationRepository organizationRepository;

    @Override
    public String save(Appeal appeal) {
        appealRepository.save(appeal);
        return "New appeal created";
    }

    @Override
    public List<Appeal> getAll() {
        return appealRepository.findAll();
    }

    @Override
    public GetAppealResponse findAppealById(Integer appealId) {
        Appeal appeal = appealRepository.findAppealById(appealId);
        GetAppealResponse getAppealResponse = new GetAppealResponse();

        Organization organization = organizationRepository.getById(appeal.getOrganizationId());

        getAppealResponse.setAppealId(appeal.getAppealId());
        getAppealResponse.setAppealName(appeal.getAppealName());
        getAppealResponse.setDescription(appeal.getDescription());
        getAppealResponse.setFromDate(appeal.getFromDate().toString());
        getAppealResponse.setToDate(appeal.getToDate().toString());
        getAppealResponse.setStatus(appeal.getStatus());
        getAppealResponse.setOrganizationName(organization.getOrganizationName());
        getAppealResponse.setOrganizationAddress(organization.getAddress());

        return getAppealResponse;
    }

    @Override
    public List<Appeal> getAppealsByOrganizationId(Integer organizationId) {
        return appealRepository.getAppealsByOrganizationId(organizationId);
    }

    @Override
    public String deleteById(Integer appealId) {
        appealRepository.deleteById(appealId);
        return "Deleted.";
    }


}

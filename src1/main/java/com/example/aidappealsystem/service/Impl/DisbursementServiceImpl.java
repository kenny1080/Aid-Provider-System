package com.example.aidappealsystem.service.Impl;

import com.example.aidappealsystem.model.Appeal.Appeal;
import com.example.aidappealsystem.model.Applications.Application;
import com.example.aidappealsystem.model.Contributions.Contribution;
import com.example.aidappealsystem.model.Disbursement.Disbursement;
import com.example.aidappealsystem.model.Disbursement.DisbursementListResponse;
import com.example.aidappealsystem.model.Disbursement.DisbursementRequest;
import com.example.aidappealsystem.model.Organization.Organization;
import com.example.aidappealsystem.repository.*;
import com.example.aidappealsystem.service.DisbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DisbursementServiceImpl implements DisbursementService {

    @Autowired
    DisbursementRepository disbursementRepository;

    @Autowired
    ContributeRepository contributeRepository;

    @Autowired
    ApplicationRepository applicationRepository;

    @Autowired
    AppealRepository appealRepository;

    @Autowired
    OrganizationRepository organizationRepository;

    @Override
    public String processDisbursement(DisbursementRequest disbursementRequest) {
        if(disbursementRequest != null){
            if(!CollectionUtils.isEmpty(disbursementRequest.getDisbursementItems())){
                int estimatedValue = 0;

                for(int i : disbursementRequest.getDisbursementItems()){
                    Contribution contribution = contributeRepository.getById(i);
                    estimatedValue += Integer.parseInt(contribution.getValue());
                    contributeRepository.updateContributionStatus("DISBURSED", disbursementRequest.getApplicationId(), i);
                }

                applicationRepository.updateApplicationStatus("DISBURSED", disbursementRequest.getApplicationId());

                Disbursement disbursement = new Disbursement();
                disbursement.setApplicationId(disbursementRequest.getApplicationId());
                disbursement.setEstimatedValues(Integer.toString(estimatedValue));
                disbursement.setDisbursedBy(disbursementRequest.getOrganizationId());
                disbursementRepository.save(disbursement);

                return "Disbursement created.";
            }

        }
        return "FAILED";
    }

    @Override
    public List<DisbursementListResponse> getDisbursementList(int organizationId) {
        List<DisbursementListResponse> disbursementListResponseList = new ArrayList<>();
        List<Disbursement> disbursementList = disbursementRepository.getDisbursementListByOrganizationId(organizationId);
        for(Disbursement disbursement : disbursementList){
            DisbursementListResponse disbursementListResponse = new DisbursementListResponse();
            Application application = applicationRepository.getById(disbursement.getApplicationId());
            Appeal appeal = appealRepository.getById(Integer.parseInt(application.getAppealId()));
            Organization organization = organizationRepository.getById(appeal.getOrganizationId());
            List<Contribution> contributionList = contributeRepository.getContributionsByApplicationIdId(application.getApplicationId());
            disbursementListResponse.setDisbursementId(disbursement.getDisbursementId());
            disbursementListResponse.setApplicationId(disbursement.getApplicationId());
            disbursementListResponse.setEstimatedValues(disbursement.getEstimatedValues());
            disbursementListResponse.setStatus(disbursement.getStatus());
            disbursementListResponse.setName(application.getName());
            disbursementListResponse.setAppealName(appeal.getAppealName());
            disbursementListResponse.setOrganizationName(organization.getOrganizationName());
            disbursementListResponse.setOrganizationAddress(organization.getAddress());
            disbursementListResponse.setAppealId(Integer.parseInt(application.getAppealId()));
            disbursementListResponse.setAddress(application.getAddress());
            List<String> contributions = new ArrayList<>();
            for(Contribution contribution : contributionList){
                contributions.add(contribution.getItem() != null ? contribution.getItem() : "RM " + contribution.getValue());
            }
            disbursementListResponse.setReceivedContributions(contributions);
            disbursementListResponseList.add(disbursementListResponse);
        }
        return disbursementListResponseList;
    }
}

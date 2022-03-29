package com.example.aidappealsystem.service.Impl;

import com.example.aidappealsystem.model.Contributions.*;
import com.example.aidappealsystem.repository.ContributeRepository;
import com.example.aidappealsystem.repository.DonorRepository;
import com.example.aidappealsystem.service.ContributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ContributeServiceImpl implements ContributeService {

    @Autowired
    ContributeRepository contributeRepository;

    @Autowired
    DonorRepository donorRepository;

    @Override
    public String createContribute(ContributeRequest contributeRequest) {
        if(contributeRequest != null){
            Donor donor = new Donor();
            donor.setName(contributeRequest.getName());
            donor.setAddress(contributeRequest.getAddress());
            donor.setNumber(contributeRequest.getNumber());
            donor.setDateCreated(new Date());

            int donorId = donorRepository.save(donor).getDonorId();

            if(!CollectionUtils.isEmpty(contributeRequest.getContributedItems())){
                for(Item item : contributeRequest.getContributedItems()){
                    Contribution contribution = new Contribution();
                    contribution.setDonorId(donorId);
                    contribution.setItem(item.getItemName());
                    contribution.setItemDescription(item.getItemDescription());
                    contribution.setItemType(item.getItemType());
                    contribution.setPaymentChannel(item.getPaymentChannel());
                    contribution.setReceiptNo(item.getReceiptNo());
                    contribution.setValue(item.getItemValue());
                    contribution.setDateCreated(new Date());
                    contribution.setAppealId(contributeRequest.getAppealId());
                    contribution.setStatus("PENDING_DISBURSE");
                    contributeRepository.save(contribution);
                }
            }
            return "Contributions are added.";
        }
        return "Failed";
    }

    @Override
    public List<ContributionListResponse> getContributionsByAppealId(int appealId) {
        List<Contribution> contributionList = contributeRepository.getContributionsByAppealId(appealId);
        List<ContributionListResponse> contributionListResponseList = new ArrayList<>();
        if(!CollectionUtils.isEmpty(contributionList)){
            for(Contribution contribution : contributionList){
                ContributionListResponse contributionListResponse = new ContributionListResponse();
                contributionListResponse.setContributionId(contribution.getContributionId());
                contributionListResponse.setAppealId(contribution.getAppealId());
                contributionListResponse.setDonorId(contribution.getDonorId());
                Donor donor = donorRepository.getById(contribution.getDonorId());
                contributionListResponse.setName(donor.getName());
                contributionListResponse.setNumber(donor.getNumber());
                contributionListResponse.setAppealId(contribution.getAppealId());
                contributionListResponse.setItem(contribution.getItem());
                contributionListResponse.setItemType(contribution.getItemType());
                contributionListResponse.setItemDescription(contribution.getItemDescription());
                contributionListResponse.setPaymentChannel(contribution.getPaymentChannel());
                contributionListResponse.setReceiptNo(contribution.getReceiptNo());
                contributionListResponse.setStatus(contribution.getStatus());
                contributionListResponse.setDateCreated(contribution.getDateCreated());
                contributionListResponse.setValue(contribution.getValue());
                contributionListResponseList.add(contributionListResponse);
            }
            return contributionListResponseList;
        }
        return null;
    }

    @Override
    public List<ContributionListResponse> getPendingContributionsByAppealId(int appealId) {
        List<Contribution> contributionList = contributeRepository.getPendingContributionsByAppealId(appealId);
        List<ContributionListResponse> contributionListResponseList = new ArrayList<>();
        if(!CollectionUtils.isEmpty(contributionList)){
            for(Contribution contribution : contributionList){
                ContributionListResponse contributionListResponse = new ContributionListResponse();
                contributionListResponse.setContributionId(contribution.getContributionId());
                contributionListResponse.setAppealId(contribution.getAppealId());
                contributionListResponse.setDonorId(contribution.getDonorId());
                Donor donor = donorRepository.getById(contribution.getDonorId());
                contributionListResponse.setName(donor.getName());
                contributionListResponse.setNumber(donor.getNumber());
                contributionListResponse.setAppealId(contribution.getAppealId());
                contributionListResponse.setItem(contribution.getItem());
                contributionListResponse.setItemType(contribution.getItemType());
                contributionListResponse.setItemDescription(contribution.getItemDescription());
                contributionListResponse.setPaymentChannel(contribution.getPaymentChannel());
                contributionListResponse.setReceiptNo(contribution.getReceiptNo());
                contributionListResponse.setStatus(contribution.getStatus());
                contributionListResponse.setDateCreated(contribution.getDateCreated());
                contributionListResponse.setValue(contribution.getValue());
                contributionListResponseList.add(contributionListResponse);
            }
            return contributionListResponseList;
        }
        return null;
    }
}

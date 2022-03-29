package com.example.aidappealsystem.service;

import com.example.aidappealsystem.model.Contributions.ContributeRequest;
import com.example.aidappealsystem.model.Contributions.Contribution;
import com.example.aidappealsystem.model.Contributions.ContributionListResponse;

import java.util.List;

public interface ContributeService {
    public String createContribute(ContributeRequest contributeRequest);

    public List<ContributionListResponse> getContributionsByAppealId(int appealId);

    public List<ContributionListResponse> getPendingContributionsByAppealId(int appealId);

}

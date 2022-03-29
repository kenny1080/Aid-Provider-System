package com.example.aidappealsystem.service;

import com.example.aidappealsystem.model.Disbursement.DisbursementListResponse;
import com.example.aidappealsystem.model.Disbursement.DisbursementRequest;

import java.util.List;

public interface DisbursementService {

    public String processDisbursement(DisbursementRequest disbursementRequest);

    public List<DisbursementListResponse> getDisbursementList(int organizationId);
}

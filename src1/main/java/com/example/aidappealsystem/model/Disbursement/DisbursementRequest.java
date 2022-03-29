package com.example.aidappealsystem.model.Disbursement;

import java.util.List;

public class DisbursementRequest {
    //use this list to select contributions & total up values
    private List<Integer> disbursementItems;
    private int applicationId;
    private int organizationId;

    public int getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(int organizationId) {
        this.organizationId = organizationId;
    }

    public List<Integer> getDisbursementItems() {
        return disbursementItems;
    }

    public void setDisbursementItems(List<Integer> disbursementItems) {
        this.disbursementItems = disbursementItems;
    }

    public int getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(int applicationId) {
        this.applicationId = applicationId;
    }
}

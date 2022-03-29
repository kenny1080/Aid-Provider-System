package com.example.aidappealsystem.model.Disbursement;

import java.util.List;

public class DisbursementListResponse {

    private int disbursementId;
    private int applicationId;
    private String name;
    private String address;
    private int appealId;
    private String appealName;
    private String organizationName;
    private String organizationAddress;
    private String estimatedValues;
    private String status;
    private List<String> receivedContributions;

    public int getDisbursementId() {
        return disbursementId;
    }

    public void setDisbursementId(int disbursementId) {
        this.disbursementId = disbursementId;
    }

    public int getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(int applicationId) {
        this.applicationId = applicationId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getAppealId() {
        return appealId;
    }

    public void setAppealId(int appealId) {
        this.appealId = appealId;
    }

    public String getEstimatedValues() {
        return estimatedValues;
    }

    public void setEstimatedValues(String estimatedValues) {
        this.estimatedValues = estimatedValues;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getReceivedContributions() {
        return receivedContributions;
    }

    public String getOrganizationName() {
        return organizationName;
    }

    public void setOrganizationName(String organizationName) {
        this.organizationName = organizationName;
    }

    public void setReceivedContributions(List<String> receivedContributions) {
        this.receivedContributions = receivedContributions;
    }

    public String getAppealName() {
        return appealName;
    }

    public void setAppealName(String appealName) {
        this.appealName = appealName;
    }

    public String getOrganizationAddress() {
        return organizationAddress;
    }

    public void setOrganizationAddress(String organizationAddress) {
        this.organizationAddress = organizationAddress;
    }
}

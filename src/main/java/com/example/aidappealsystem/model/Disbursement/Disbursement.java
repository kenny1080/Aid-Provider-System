package com.example.aidappealsystem.model.Disbursement;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Disbursement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int disbursementId;
    private int applicationId;
    private String estimatedValues;
    private int disbursedBy;
    private final String status = "DISBURSED";

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

    public String getEstimatedValues() {
        return estimatedValues;
    }

    public void setEstimatedValues(String estimatedValues) {
        this.estimatedValues = estimatedValues;
    }

    public String getStatus() {
        return status;
    }

    public int getDisbursedBy() {
        return disbursedBy;
    }

    public void setDisbursedBy(int disbursedBy) {
        this.disbursedBy = disbursedBy;
    }
}

package com.example.aidappealsystem.repository;

import com.example.aidappealsystem.model.Disbursement.Disbursement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DisbursementRepository extends JpaRepository<Disbursement, Integer> {

    @Query(value = "SELECT * FROM disbursement d WHERE d.disbursed_by = ?1", nativeQuery = true)
    public List<Disbursement> getDisbursementListByOrganizationId(int organizationId);

}

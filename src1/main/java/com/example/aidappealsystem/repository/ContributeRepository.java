package com.example.aidappealsystem.repository;

import com.example.aidappealsystem.model.Contributions.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ContributeRepository extends JpaRepository<Contribution, Integer> {

    @Query(value = "SELECT * FROM contribution c WHERE c.appeal_id = ?1", nativeQuery = true)
    public List<Contribution> getContributionsByAppealId(int appealId);

    @Query(value = "UPDATE contribution c SET c.status = ?1, c.disbursed_to = ?2 WHERE c.contribution_id = ?3", nativeQuery = true)
    @Modifying
    public void updateContributionStatus(String status, int applicationId, int contributionId);

    @Query(value = "SELECT * FROM contribution c WHERE c.appeal_id = ?1 AND c.status != 'DISBURSED'", nativeQuery = true)
    public List<Contribution> getPendingContributionsByAppealId(int appealId);

    @Query(value = "SELECT * FROM contribution c WHERE c.disbursed_to = ?1", nativeQuery = true)
    public List<Contribution> getContributionsByApplicationIdId(int applicationId);
}

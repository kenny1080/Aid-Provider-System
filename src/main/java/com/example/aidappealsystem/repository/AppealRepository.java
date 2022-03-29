package com.example.aidappealsystem.repository;

import com.example.aidappealsystem.model.Appeal.Appeal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppealRepository extends JpaRepository<Appeal, Integer> {

    @Query(value = "Select * from appeal a where a.appeal_id = ?1", nativeQuery = true)
    Appeal findAppealById(Integer appealId);

    @Query(value = "Select * from appeal a where a.organization_id = ?1", nativeQuery = true)
    List<Appeal> getAppealsByOrganizationId(Integer organizationId);
}

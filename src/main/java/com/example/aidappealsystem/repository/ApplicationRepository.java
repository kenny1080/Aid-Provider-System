package com.example.aidappealsystem.repository;

import com.example.aidappealsystem.model.Applications.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    @Query(value = "SELECT * FROM application a WHERE a.appeal_id = ?1", nativeQuery = true)
    public List<Application> getApplicationsByAppealId(int appealId);

    @Query(value = "SELECT * FROM application a WHERE a.application_id = ?1", nativeQuery = true)
    public Application getApplicationById(int appealId);

    @Query(value = "UPDATE application a SET a.status = ?1 WHERE a.application_id = ?2", nativeQuery = true)
    @Modifying
    void updateApplicationStatus(String status, int applicationId);
}

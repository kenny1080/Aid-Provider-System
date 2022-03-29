package com.example.aidappealsystem.repository;

import com.example.aidappealsystem.model.Contributions.Donor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonorRepository extends JpaRepository<Donor, Integer> {

}

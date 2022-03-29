package com.example.aidappealsystem.repository;

import com.example.aidappealsystem.model.Applications.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Integer> {
}

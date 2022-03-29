package com.example.aidappealsystem.service;

import com.example.aidappealsystem.model.Applications.Document;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {
    public Document save(MultipartFile file);

    public Document getFile(int fileId);
}

package com.example.aidappealsystem.service.Impl;

import com.example.aidappealsystem.model.Applications.Document;
import com.example.aidappealsystem.repository.DocumentRepository;
import com.example.aidappealsystem.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
public class FileStorageServiceImpl implements FileStorageService {

    @Autowired
    DocumentRepository documentRepository;

    @Override
    public Document save(MultipartFile file) {
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            Document dbFile = new Document(fileName, file.getContentType(), file.getBytes());
            return documentRepository.save(dbFile);

        } catch (IOException ex) {
           ex.printStackTrace();
        }
        return null;
    }

    @Override
    public Document getFile(int fileId) {
        return documentRepository.getById(fileId);
    }

}

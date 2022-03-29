package com.example.aidappealsystem.service;

import com.example.aidappealsystem.model.Appeal.Appeal;
import com.example.aidappealsystem.model.Appeal.GetAppealResponse;

import java.util.List;

public interface AppealService {

    public String save(Appeal appeal);

    public List<Appeal> getAll();

    public GetAppealResponse findAppealById(Integer appealId);

    public List<Appeal> getAppealsByOrganizationId(Integer organizationId);

    public String deleteById(Integer appealId);
}

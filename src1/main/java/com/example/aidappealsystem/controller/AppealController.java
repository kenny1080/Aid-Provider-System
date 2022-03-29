package com.example.aidappealsystem.controller;

import com.example.aidappealsystem.model.Appeal.Appeal;
import com.example.aidappealsystem.model.Appeal.GetAppealResponse;
import com.example.aidappealsystem.service.AppealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/appeal")
@CrossOrigin
public class AppealController {

    @Autowired
    private AppealService appealService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody Appeal appeal) throws Exception {
        try{
            validateAppeal(appeal);
            String message = appealService.save(appeal);
            return ResponseEntity.ok().body(message);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getAll")
    public List<Appeal> getAll(){
        return appealService.getAll();
    }

    @GetMapping("/get/single")
    @ResponseBody
    public GetAppealResponse getAppeal(@RequestParam(name = "appealId") Integer appealId) {
        return appealService.findAppealById(appealId);
    }

    @GetMapping("/get/appeals")
    @ResponseBody
    public List<Appeal> getAppealsByOrganizationId(@RequestParam(name = "organizationId") Integer organizationId) {
        return appealService.getAppealsByOrganizationId(organizationId);
    }

    @DeleteMapping("/delete")
    public String deleteAppeal(@RequestParam(name = "appealId") Integer appealId){
        return appealService.deleteById(appealId);
    }

    private void validateAppeal(Appeal appeal) throws Exception {
        if(appeal.getOrganizationId() == 0){
            throw new Exception("Error while processing appeal.");
        }
    }

}

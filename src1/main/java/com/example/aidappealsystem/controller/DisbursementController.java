package com.example.aidappealsystem.controller;

import com.example.aidappealsystem.helper.Utilities;
import com.example.aidappealsystem.model.Contributions.ContributeRequest;
import com.example.aidappealsystem.model.Disbursement.DisbursementListResponse;
import com.example.aidappealsystem.model.Disbursement.DisbursementRequest;
import com.example.aidappealsystem.service.DisbursementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/disbursement")
@CrossOrigin
public class DisbursementController {

    @Autowired
    DisbursementService disbursementService;

    @PostMapping("/record")
    public ResponseEntity recordDisbursement(@RequestBody  DisbursementRequest disbursementRequest) throws Exception {
        try{
            validateDisbursementRequest(disbursementRequest);
            String message = disbursementService.processDisbursement(disbursementRequest);
            return ResponseEntity.ok().body(message);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getDisbursementList")
    public ResponseEntity getDisbursementList(@RequestParam(name = "organizationId") int organizationId){
        List<DisbursementListResponse> disbursementListResponseList = disbursementService.getDisbursementList(organizationId);
        return ResponseEntity.ok().body(disbursementListResponseList);
    }

    private void validateDisbursementRequest(DisbursementRequest disbursementRequest) throws Exception {
        if(Utilities.isEmpty(disbursementRequest.getApplicationId()) || disbursementRequest.getOrganizationId() == 0 || CollectionUtils.isEmpty(disbursementRequest.getDisbursementItems())){
            throw new Exception("Error while processing disbursements.");
        }
    }
}

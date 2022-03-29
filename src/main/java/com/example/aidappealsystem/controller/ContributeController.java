package com.example.aidappealsystem.controller;

import com.example.aidappealsystem.helper.Utilities;
import com.example.aidappealsystem.model.Contributions.ContributeRequest;
import com.example.aidappealsystem.model.Contributions.ContributionListResponse;
import com.example.aidappealsystem.service.ContributeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contribute")
@CrossOrigin
public class ContributeController {

    @Autowired
    ContributeService contributeService;

    @PostMapping("/donate")
    public ResponseEntity<String> donate(@RequestBody ContributeRequest contributeRequest) throws Exception {
        try{
            validateContributionRequest(contributeRequest);
            String message = contributeService.createContribute(contributeRequest);
            return ResponseEntity.ok().body(message);
        } catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getContributions")
    @ResponseBody
    public List<ContributionListResponse> getContributionListByAppealId(@RequestParam(name = "appealId") int appealId){
        return contributeService.getContributionsByAppealId(appealId);
    }

    @GetMapping("/getPendingContributions")
    @ResponseBody
    public List<ContributionListResponse> getPendingContributionListByAppealId(@RequestParam(name = "appealId") int appealId){
        return contributeService.getPendingContributionsByAppealId(appealId);
    }

    private void validateContributionRequest(ContributeRequest contributeRequest) throws Exception {
        if(Utilities.isEmpty(contributeRequest.getAddress()) || Utilities.isEmpty(contributeRequest.getName()) || Utilities.isEmpty(contributeRequest.getNumber()) || CollectionUtils.isEmpty(contributeRequest.getContributedItems())){
            throw new Exception("Error while processing contributions.");
        }
    }


}

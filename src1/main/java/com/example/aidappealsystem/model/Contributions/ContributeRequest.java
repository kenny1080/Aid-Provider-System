package com.example.aidappealsystem.model.Contributions;

import java.util.List;

public class ContributeRequest {

    private String name;
    private String address;
    private String number;
    private int appealId;
    private List<Item> contributedItems;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public int getAppealId() {
        return appealId;
    }

    public void setAppealId(int appealId) {
        this.appealId = appealId;
    }

    public List<Item> getContributedItems() {
        return contributedItems;
    }

    public void setContributedItems(List<Item> contributedItems) {
        this.contributedItems = contributedItems;
    }
}

package com.example.aidappealsystem.model.Contributions;

public class Item {
    private String itemName;
    private String itemType;
    private String itemValue;
    private String itemDescription;
    private String paymentChannel;
    private String receiptNo;

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }

    public String getItemValue() {
        return itemValue;
    }

    public void setItemValue(String itemValue) {
        this.itemValue = itemValue;
    }

    public String getItemDescription() {
        return itemDescription;
    }

    public void setItemDescription(String itemDescription) {
        this.itemDescription = itemDescription;
    }

    public String getPaymentChannel() {
        return paymentChannel;
    }

    public void setPaymentChannel(String paymentChannel) {
        this.paymentChannel = paymentChannel;
    }

    public String getReceiptNo() {
        return receiptNo;
    }

    public void setReceiptNo(String receiptNo) {
        this.receiptNo = receiptNo;
    }

    public enum ItemType{
        ITEM("ITEM"),
        CASH("CASH");

        private String type;

        ItemType(String type){
            this.type = type;
        }

        public String getType(){
            return this.type;
        }
    }
}

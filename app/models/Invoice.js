class Invoice {
    constructor(id,idCustomer, idSeller, idPurchaseOrder, invoiceCode, cai, rtn, invoiceType, saleDate, dueDate, creditDays, invoiceNotes) {
        this.id = id;
        this.idCustomer = idCustomer;
        this.idSeller = idSeller;
        this.idPurchaseOrder = idPurchaseOrder;
        this.invoiceCode = invoiceCode;
        this.cai = cai;
        this.rtn = rtn;
        this. invoiceType = invoiceType;
        this.saleDate =saleDate;
        this.dueDate = dueDate;
        this.creditDays = creditDays;
        this.invoiceNotes = invoiceNotes;
    }
}

export default Invoice;
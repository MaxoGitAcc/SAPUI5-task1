sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", {
        onInit() {
            const oViewModel = new JSONModel({
                currency: "EUR"
            });
            this.getView().setModel(oViewModel, "view");
        }, 

        onFilterInvoices(oEvent) {
			const aFilter = [];
			const sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
			}

			const oList = this.byId("invoiceList");
			const oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPress(oEvent) {
            const oItem = oEvent.getSource();
			const oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(oItem.getBindingContext("invoice").getPath().substring(1))
            });
		},

        onFilterByStatus(oEvent) {
            const sSelectedKey = oEvent.getParameter("selectedItem").getKey();
            const oList = this.byId("invoiceList");
            const oBinding = oList.getBinding("items");
        
            const sQuery = this.byId("searchFieldId")?.getValue(); // replace with your SearchField id
            const aFilters = [];
        
            if (sQuery) {
                aFilters.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }
        
            if (sSelectedKey && sSelectedKey !== "All") {
                aFilters.push(new Filter("Status", FilterOperator.EQ, sSelectedKey));
            }
        
            oBinding.filter(aFilters);
        }
        
    });
});
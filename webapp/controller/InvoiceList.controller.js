sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("ui5.walkthrough.controller.InvoiceList", {

        onInit() {
            const oViewModel = new JSONModel({ currency: "EUR" });
            this.getView().setModel(oViewModel, "view");

            // Load status options from local JSON file
            const oStatusModel = new JSONModel(
                sap.ui.require.toUrl("ui5/walkthrough/localService/statuses.json")
            );
            this.getView().setModel(oStatusModel, "status");
        },

        /* Combines filters from the search field and status filter
          so both work together without duplicating logic. */
        applyFilters() {
            const oList = this.byId("invoiceList");
            const oBinding = oList?.getBinding("items");
            if (!oBinding) return;

            const sQuery = this.byId("searchField")?.getValue() || "";
            const sStatus = this.byId("statusFilter")?.getSelectedKey() || "";
            const aFilters = [];

            if (sQuery) {
                aFilters.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
            }
            if (sStatus && sStatus !== "All") {
                aFilters.push(new Filter("Status", FilterOperator.EQ, sStatus));
            }

            oBinding.filter(aFilters);
        },

        onFilterInvoices() {
            this.applyFilters();
        },

        onFilterByStatus() {
            this.applyFilters();
        },

        onPress(oEvent) {
            const oItem = oEvent.getSource();
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("detail", {
                invoicePath: window.encodeURIComponent(
                    oItem.getBindingContext("invoice").getPath().substring(1)
                )
            });
        }

    });
});

sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/App"
], (opaTest) => {
	"use strict";

	QUnit.module("Navigation");

	opaTest("Should open the Hello dialog", (Given, When, Then) => {
		Given.iStartMyUIComponent({
			componentConfig: {
				name: "ui5.walkthrough"
			}
		});

		When.onTheAppPage.iPressTheSayHelloWithDialogButton();

		Then.onTheAppPage.iShouldSeeTheHelloDialog();

		Then.iTeardownMyApp();
	});
});
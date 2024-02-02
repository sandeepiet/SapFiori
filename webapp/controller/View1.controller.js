sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("odatacrud.controller.View1", {
            onInit: function () {
                //Router Initialisation
                this._oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //Attach event for routing on view patter matched 
                this._oRouter.attachRouteMatched(this.onRouteMatched, this);
                // this.onReadAll();
            },

            onRouteMatched: function (oEvent) {
                var gcontextPath = oEvent.getParameter("arguments").contextPath;
            },

            onReadAll: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (error) {
                        console.log(error);
                    }
                });
            },
            onReadFilters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilter = new sap.ui.model.Filter('Rating', 'EQ', 3);
                oModel.read("/Products", {
                    filters: [oFilter],
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (error) {
                        console.log(error);
                    }
                });
            },
            onSorterFilters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilter = new sap.ui.model.Sorter('Price', true);
                oModel.read("/Products", {
                    sorters: [oFilter],
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (error) {
                        console.log(error);
                    }
                });
            },
            onReadParameters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilter = new sap.ui.model.Sorter('Price', true);
                oModel.read("/Products", {
                    urlParameters: { $skip: 2, $top: 4 },
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (error) {
                        console.log(error);
                    }
                });
            },
            onEdit: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                if (oEvent.getSource().getText() === "Edit") {
                    oEvent.getSource().setText("Submit");
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);
                } else {
                    oEvent.getSource().setText("Edit");
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
                    var oInput = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
                    var oId = oEvent.getSource().getBindingContext().getProperty("ID");
                    oModel.update("/Products(" + oId + ")", { Rating: oInput }, {
                        success: function (odata) {
                            that.onReadAll();
                        }, error: function (error) {
                            console.log(error);
                        }
                    })
                }

                var oFilter = new sap.ui.model.Sorter('Price', true);
                // oModel.read("/Products", {
                //     urlParameters: {$skip:2,$top:4},
                //     success: function (odata) {
                //         var jModel = new sap.ui.model.json.JSONModel(odata);
                //         that.getView().byId("idProducts").setModel(jModel);
                //     }, error: function (error) {
                //         console.log(error);
                //     }
                // });
            }
        });
    });

/**
 * @namespace
 * @description This customer specific API extends the <b>CommunicationPanelControl / CPC</b> API.
 * <br/>These functions are available via namespace <b>CPC.Ext | CommunicationPanelControl.Ext</b>. Standard CPC needs to be loaded first.
 *
*/

const Ext = new function () {
    this.someCustomerSpecificFunction = () => {

    };
}();

if (window.CommunicationPanelControl) {
    window.CommunicationPanelControl.Ext = Ext;
} else {
    console.warn('You must load the CPC lib before CPC-Ext.');
}

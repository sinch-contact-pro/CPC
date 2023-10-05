class MyWebComponentWrapperForCPC extends HTMLElement {
    constructor () {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
      <div
        id="commPanelContainer" 
        style="width:${this.hasAttribute('width') ? this.getAttribute('width') : '500px'}; height:${this.hasAttribute('height') ? this.getAttribute('height') : '700px'}; background-color:darkgray;"
      />
    `;
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback () {
    // Web Component and shadow DOM are ready. Proceed to load CPC library:
        const commPanelContainerWithinShadowDOM = this._shadowRoot.querySelector('#commPanelContainer');
        const script = document.createElement('script');
        script.src = 'CPC.js'; // Note: For example Salesforce requires special handling: https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.js_third_party_library
        script.onload = async function () {
            // Define an event handler for events sent by Communication Panel:
            const myEventHandler = (event) => {
                // Forward event as CustomEvent:
                const cpcEvent = new CustomEvent('cpc', { detail: event });
                window.dispatchEvent(cpcEvent);
            };

            // Configuration:
            const config = {
                enableDebugLog: false, // Set to true for troubleshooting only
                tenantBaseUrl: 'https://login-eu-c1.cc.sinch.com/standarddemo', // Base-URL of Sinch Contact Pro Standard Demo system - Replace with your own!
                authentication: { basic: { userName: '', password: '' } }, // Optionally pre-authenticate user
                parentElement: commPanelContainerWithinShadowDOM,
                eventHandler: myEventHandler,
                responsive: true, // (Deprecated after 22Q3 version) Enable My Conversations view.
                denyPopout: false, // Deny user from opening pop-out window. Also disables My Conversations view.
                minWidth: 500, // Width limit for toggling between My Conversations view and regular embedded view. Default: 500.
                minHeight: 400 // Height limit for toggling between My Conversations view and regular embedded view. Default: 400.
            };

            // Embed Communication Panel:
            const loaded = await window.CPC.load(config);
            if (!loaded) {
                console.warn('Communication Panel could not be embedded');
            }
        };

        // Append CPC to document header:
        document.head.appendChild(script);
    }
}

window.customElements.define('my-web-component-wrapper-for-cpc', MyWebComponentWrapperForCPC);

class MemberList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    border: 1px solid #ccc;
                    padding: 15px;
                    margin-top: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                }
                h2 {
                    color: #0056b3;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                }
                li {
                    background-color: #e9ecef;
                    margin-bottom: 5px;
                    padding: 8px;
                    border-radius: 4px;
                }
            </style>
            <h2>Club Members</h2>
            <ul id="members-list">
                <li>Member 1</li>
                <li>Member 2</li>
                <li>Member 3</li>
            </ul>
        `;
    }

    connectedCallback() {
        // You can fetch actual member data here
        console.log("MemberList component added to the DOM.");
    }
}

customElements.define('member-list', MemberList);

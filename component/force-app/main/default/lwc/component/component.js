import { LightningElement, track } from 'lwc';

export default class AccountTable extends LightningElement {
  @track accounts = [];
  @track name = '';
  @track type = '';
  @track showModal = false;

  // Load initial set of accounts
  connectedCallback() {
    this.loadAccounts();
  }

  // Load more accounts when "Load more" button is clicked
  loadMoreAccounts() {
    this.loadAccounts();
  }

  // Open modal when "Create Account" button is clicked
  openModal() {
    this.showModal = true;
  }

  // Close modal when "Cancel" button is clicked
  closeModal() {
    this.showModal = false;
  }

  // Save account when "Save" button is clicked
  saveAccount() {
    const newAccount = { name: this.name, type: this.type,};
    // Save new account to the server
    saveAccountToServer(newAccount).then(() => {
      // Close modal and reset form
      this.closeModal();
      this.name = '';
      this.type = '';
      // Add new account to the table
      newAccount.owner = 'you';
      this.accounts = [...this.accounts, newAccount];
    });
  }

  // Handle search input
  handleSearchInput(event) {
    const searchTerm = event.target.value;
    // Search accounts from the server
    searchAccountsOnServer(searchTerm).then((results) => {
      this.accounts = results;
    });
  }

  // Handle name input
  handleNameChange(event) {
    this.name = event.target.value;
  }

  // Handle type input
  handleTypeChange(event) {
    this.type = event.target.value;
  }

  // Load accounts from the server
  loadAccounts() {
    getAccountsFromServer().then((results) => {
      this.accounts = [...this.accounts, ...results];
    });
  }
}

function getAccountsFromServer() {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Pretend to get accounts from the server
        const accounts = [
          { id: 1, name: 'Account 1', type: 'Type 1', owner: 'Owner 1', createdDate: '01/01/2021' },
          { id: 2, name: 'Account 2', type: 'Type 2', owner: 'Owner 2', createdDate: '01/02/2021' },
          { id: 3, name: 'Account 3', type: 'Type 3', owner: 'Owner 3', createdDate: '01/03/2021' },
        ];
        resolve(accounts);
      }, 1000);
    });
  }
  
  // Save account to the server
  function saveAccountToServer(account) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Pretend to save account to the server
        resolve();
      }, 1000);
    });
  }
  
  // Search accounts from the server
  function searchAccountsOnServer(searchTerm) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Pretend to search accounts from the server
        const accounts = [
          { id: 1, name: 'Account 1', type: 'Type 1', owner: 'Owner 1', createdDate: '01/01/2021' },
          { id: 2, name: 'Account 2', type: 'Type 2', owner: 'Owner 2', createdDate: '01/02/2021' },
        ];
        resolve(accounts);
      }, 1000);
    });
  }
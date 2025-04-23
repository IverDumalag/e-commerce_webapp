class AccountList {
  static accounts = [
    { id: 0, username: 'admin0@gmail.com', password: 'admin123' },
    { id: 1, username: 'admin1@gmail.com', password: 'admin123' },
  ];

  static accountLoggedIn = { id: null, username: '' };

  static getAccounts() {
    return this.accounts;
  }

  static getAccountLoggedIn() {
    return this.accountLoggedIn;
  }

  static setAccountLoggedIn(account) {
    this.accountLoggedIn = account;
  }

  static addAccount(username, password) {
    const newAccount = {
      id: this.accounts.length,
      username,
      password,
    };
    this.accounts.push(newAccount);
  }

  static findAccount(username, password) {
    return this.accounts.find(
      (acc) => acc.username === username && acc.password === password
    );
  }

  static isDuplicateAccount(username) {
    return this.accounts.some((acc) => acc.username === username);
  }
}

export default AccountList;
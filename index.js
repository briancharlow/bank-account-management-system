class BankAccount {
  constructor(accountNumber, accountHolder, balance) {
    this._accountNumber = accountNumber;
    this._accountHolder = accountHolder;
    this._balance = balance;
  }

  get accountNumber() {
    return this._accountNumber;
  }

  get accountHolder() {
    return this._accountHolder;
  }

  get balance() {
    return this._balance;
  }

  deposit(amount) {
    this._balance += amount;
    console.log(`Deposited $${amount} into account ${this._accountNumber}`);
  }

  withdraw(amount) {
    if (this._balance >= amount) {
      this._balance -= amount;
      console.log(`Withdrawn $${amount} from account ${this._accountNumber}`);
    } else {
      console.log(`Insufficient balance in account ${this._accountNumber}`);
    }
  }
}

class SavingsAccount extends BankAccount {
  constructor(accountNumber, accountHolder, balance, interestRate) {
    super(accountNumber, accountHolder, balance);
    this._interestRate = interestRate;
  }

  calculateInterest() {
    const interestAmount = this._balance * this._interestRate;
    console.log(`Interest amount for account ${this._accountNumber}: $${interestAmount}`);
    return interestAmount;
  }
}

class CheckingAccount extends BankAccount {
  constructor(accountNumber, accountHolder, balance, overdraftLimit) {
    super(accountNumber, accountHolder, balance);
    this._overdraftLimit = overdraftLimit;
  }

  withdraw(amount) {
    const availableBalance = this._balance + this._overdraftLimit;
    if (availableBalance >= amount) {
      if (this._balance >= amount) {
        this._balance -= amount;
        console.log(`Withdrawn $${amount} from account ${this._accountNumber}`);
      } else {
        const remainingAmount = amount - this._balance;
        this._balance = 0;
        console.log(`Withdrawn $${this._balance} from account ${this._accountNumber}`);
        console.log(`Withdrawn $${remainingAmount} from overdraft limit`);
      }
    } else {
      console.log(`Withdrawal amount exceeds the overdraft limit for account ${this._accountNumber}`);
    }
  }
}

// Usage Example
const savingsAccount = new SavingsAccount("SAV-123", "John Doe", 1000, 0.05);
savingsAccount.deposit(500);
savingsAccount.withdraw(200);
savingsAccount.calculateInterest();

const checkingAccount = new CheckingAccount("CHK-456", "Jane Smith", 500, 1000);
checkingAccount.deposit(300);
checkingAccount.withdraw(800);
checkingAccount.withdraw(200);

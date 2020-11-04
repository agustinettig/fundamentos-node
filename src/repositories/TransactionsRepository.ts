import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (total, transaction) => {
        if (transaction.type === 'income') total.income += transaction.value;
        else total.outcome += transaction.value;
        return total;
      },
      {
        income: 0,
        outcome: 0,
      },
    );
    return { income, outcome, total: income - outcome };
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

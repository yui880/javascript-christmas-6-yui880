class Discount {
  #amount;

  constructor() {
    this.#amount = 0;
  }

  apply(purchaseAmount) {
    // 할인 진행
  }

  getAmount() {
    return this.#amount;
  }
}

export default Discount;

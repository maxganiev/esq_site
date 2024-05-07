export class Counter {
  constructor(/**@type {Number | undefined | null} */ iterator) {
    this.startValue = 0;
    this.iterator = iterator || 250;
  }

  /**
   * @param {Number} maxValue
   */
  rollCounter(maxValue) {
    return new Promise((resolve) => {
      const int = setInterval(() => {
        if (this.startValue < maxValue)
          this.startValue += maxValue / this.iterator;
        else {
          clearInterval(int);
          resolve(this.startValue);
        }
      }, 0);
    });
  }

  /**
   * @param {Number} maxValue
   */
  async displayValue(maxValue) {
    await this.rollCounter(maxValue);
    this.startValue = this.startValue > maxValue ? maxValue : this.startValue;
  }
}

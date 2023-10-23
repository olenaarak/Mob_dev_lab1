// Основний клас, який описує правила обчислення інтегралів
class IntegralRule {
  constructor(interval, stepsCount) {
    this.interval = interval; // Інтервал інтеграції
    this.stepsCount = stepsCount; // Кількість кроків поділу

      // Обчислюємо розмір кроку
    this.delta = this.calculateStep();
  }

    // Метод для обчислення розміру кроку
  calculateStep() {
    const {start, end} = this.interval;

    return (end - start) / this.stepsCount;
  }

    // Заготовка метода для розрахунку точок інтервалу
  calculateIntervalPoints() {}

    // Заготовка метода для обчислення інтегралу
  calculate() {}
}

// Клас для обчислення інтегралу за правилом серединних прямокутників
class MidpointRule extends IntegralRule {
    // Метод для обчислення середніх точок прямокутників
  calculateIntervalPoints() {
    const midPoints = [];
    const {start, end} = this.interval;

    for (let i = start; i + this.delta <= end; i += this.delta) {
      const curStart = i;
      const curEnd = i + this.delta;
      midPoints.push((curEnd + curStart) / 2);
    }

    return midPoints;
  }
    // Обчислення інтегралу за правилом серединних прямокутників
  calculate(func) {
    const midPoints = this.calculateIntervalPoints();
    return midPoints
      .reduce((sum, currentPoint) => {
        return sum + this.delta * Math.abs(func(currentPoint));
      }, 0)
      .toFixed(4);
  }
}
// Правило трапецій - ще один метод наближення інтегралів
class TrapezoidRule extends IntegralRule {
    // Отримує всі точки в межах інтервалу
  calculateIntervalPoints() {
    const intervalPoints = [];
    const {start, end} = this.interval;

    for (let i = start; i <= end; i += this.delta) {
      intervalPoints.push(i);
    }

    return intervalPoints;
  }

    // Обчислює інтеграл за правилом трапецій
  calculate(fX) {
    const intervalPoints = this.calculateIntervalPoints();
    const lastIndex = intervalPoints.length - 1;
    return intervalPoints
      .reduce((sum, currentPoint, index) => {
        let funcExpr = 2 * fX(currentPoint);
        if (index === 0 || index === lastIndex) {
          funcExpr = fX(currentPoint);
        }
        return sum + 0.5 * this.delta * Math.abs(funcExpr);
      }, 0)
      .toFixed(4);
  }
}

class SimpsonRule extends IntegralRule {
    // Отримує всі точки в межах інтервалу
  calculateIntervalPoints() {
    const intervalPoints = [];
    const {start, end} = this.interval;

    for (let i = start; i <= end; i += this.delta) {
      intervalPoints.push(i);
    }

    return intervalPoints;
  }
    // Обчислює інтеграл за методом Сімпсона
  calculate(fX) {
    const intervalPoints = this.calculateIntervalPoints();
    const lastIndex = intervalPoints.length - 1;
    return intervalPoints
      .reduce((sum, currentPoint, index) => {
        let funcExpr = 2 * fX(currentPoint);
        if (index === 0 || index === lastIndex) {
          funcExpr = fX(currentPoint);
        } else if (index % 2 !== 0) {
          funcExpr = 4 * fX(currentPoint);
        }
        return sum + (this.delta / 3) * Math.abs(funcExpr);
      }, 0)
      .toFixed(4);
  }
}

module.exports = {MidpointRule, TrapezoidRule, SimpsonRule};

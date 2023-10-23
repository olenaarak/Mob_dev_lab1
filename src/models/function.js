// Клас Function є базовим класом для всіх функцій. Він містить властивість coefs, яка представляє
// коефіцієнти функції та метод calculateIntegral для обчислення інтегралу функції за заданим правилом.

class Function {
  constructor(coefs, integralRule = null) {
    this.coefs = coefs;
  }

    // Метод fx() залишений порожнім і призначений для реалізації в підкласах.
  fx() {}
    // Метод calculateIntegral обчислює інтеграл функції за допомогою заданого правила і повертає результат
      // та час, який зайняло обчислення.
  calculateIntegral(integralRule) {
    const start = performance.now();
    const result = integralRule.calculate(this.fX.bind(this));
    const end = performance.now();

    return [result, (end - start).toFixed(4)];
  }
}

// Клас ParabolicFunction є підкласом класу Function і представляє параболічну функцію.

class ParabolicFunction extends Function {
    // Метод fX(x) обчислює значення параболічної функції за формулою a * x^2 + b * x + c,
      // де a, b і c - це коефіцієнти, задані властивістю coefs базового класу Function
  fX(x) {
    const {a, b, c} = this.coefs;
    return a * Math.pow(x, 2) + b * x + c;
  }
}
// Клас SinusoidFunction є підкласом класу Function і представляє синусоїдальну функцію.
class SinusoidFunction extends Function {
    // Метод fX(x) обчислює значення синусоїдальної функції за формулою a * sin(b * x + c) + d,
      // де a, b, c і d - це коефіцієнти, задані властивістю coefs базового класу Function.
  fX(x) {
    const {a, b, c, d} = this.coefs;
    return a * Math.sin(b * x + c) + d;
  }
}

// Експортуємо класи ParabolicFunction і SinusoidFunction для використання в інших модулях.
module.exports = {ParabolicFunction, SinusoidFunction};

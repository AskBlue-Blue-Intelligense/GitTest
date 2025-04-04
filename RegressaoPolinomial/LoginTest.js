/LoginTest.js
const { Builder, By, until } = require('selenium-webdriver');

async function testLogin(email, password, expectedUrl, expectedErrorMessage) {
  let driver = await new Builder().forBrowser('firefox').build();
  try {
    await driver.get('http://localhost:3000/Account/Login'); // Substituir pela URL correta

    await driver.findElement(By.name('email')).sendKeys(email);
    await driver.findElement(By.name('password')).sendKeys(password);
    await driver.findElement(By.xpath("//button[text()='Login']")).click();

    if (expectedUrl) {
      await driver.wait(until.urlIs(expectedUrl), 5000);
    } else if (expectedErrorMessage) {
      let errorMessage = await driver.findElement(By.css('.error-message')).getText();
      if (errorMessage !== expectedErrorMessage) {
        throw new Error(`Esperava "${expectedErrorMessage}", mas recebeu "${errorMessage}"`);
      }
    }
  } finally {
    await driver.quit();
  }
}

// Testes
testLogin('usuario@exemplo.com', 'SenhaSegura123', 'http://localhost:3000/', null);
testLogin('usuario@exemplo.com', 'SenhaIncorreta', null, 'Nome de utilizador ou palavra-passe inválidos. Por favor, tente novamente.');
testLogin('emailinvalido@exemplo.com', 'SenhaSegura123', null, 'Nome de utilizador ou palavra-passe inválidos. Por favor, tente novamente.');
testLogin('', '', null, 'Preencha todos os campos.');
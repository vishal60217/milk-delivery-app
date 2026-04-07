const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Milk Delivery App E2E', () => {
  let driver;
  const appUrl = process.env.APP_URL || 'http://127.0.0.1:3000';

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--window-size=1440,1200');

    if (process.env.CHROME_BIN) {
      options.setChromeBinaryPath(process.env.CHROME_BIN);
    }

    const serviceBuilder = process.env.CHROMEDRIVER_PATH
      ? new chrome.ServiceBuilder(process.env.CHROMEDRIVER_PATH)
      : undefined;

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .setChromeService(serviceBuilder)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should sign up and reach the dashboard page', async () => {
    const username = `tester_${Date.now()}`;

    await driver.get(`${appUrl}/signup`);

    await driver.findElement(By.css('input[type="text"]')).sendKeys(username);

    const passwordFields = await driver.findElements(By.css('input[type="password"]'));
    await passwordFields[0].sendKeys('pass1234');
    await passwordFields[1].sendKeys('pass1234');

    await driver.findElement(By.css('button[type="submit"]')).click();

    await driver.wait(until.urlContains('/dashboard'), 10000);
    await driver.wait(until.elementLocated(By.css('h1')), 10000);

    const heading = await driver.findElement(By.css('h1')).getText();
    expect(heading).toContain('Dashboard');
  });
});

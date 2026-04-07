const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Milk Delivery App E2E', () => {
  let driver;

  beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('--headless'); // Run in headless mode for CI
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  afterAll(async () => {
    if (driver) {
      await driver.quit();
    }
  });

  it('should load the dashboard page', async () => {
    await driver.get('http://localhost:3000'); // Assuming the app is running on localhost:3000

    // Wait for redirect to dashboard
    await driver.wait(until.urlContains('/dashboard'), 10000);

    const title = await driver.getTitle();
    expect(title).toContain('Dashboard'); // Adjust based on actual title
  });

  // Add more e2e tests as needed
});
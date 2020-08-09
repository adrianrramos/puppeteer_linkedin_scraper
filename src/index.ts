import puppeteer from "puppeteer";
import dotenv from "dotenv";

dotenv.config();

const scrapeLinkedIn = async () => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(`${process.env.LINKEDIN_LOCATION}`);

    await page.waitForSelector("#username");
    await page.type("#username", `${process.env.LINKEDIN_USERNAME}`);
    await page.type("#password", `${process.env.LINKEDIN_PASSWORD}`);
    await page.click('[class="btn__primary--large from__button--floating"]');

    await page.waitForSelector('[class="msg-overlay-bubble-header"]');
    await page.click('[class="msg-overlay-bubble-header"]');

    await page.waitForSelector('[class="search-global-typeahead__input always-show-placeholder"]');
    await page.type('[class="search-global-typeahead__input always-show-placeholder"]', "recruiter");
    await page.keyboard.press("Enter");

    await page.waitForSelector('[aria-label="View only People results"]');
    await page.click('[aria-label="View only People results"]');

    await page.waitForSelector('[aria-label="Locations filter."]');
    await page.click('[aria-label="Locations filter."]');

    await page.waitForXPath('//*[@id="ember572"]/li[2]/label/p/span');
    const sanFranLocation = await page.$x('//*[@id="ember572"]/li[2]/label/p/span');
    await sanFranLocation[0].click();

    page.screenshot({ path: "example.png" });
  } catch (error) {
    console.log(error);
    await browser.close();
  }
};

scrapeLinkedIn();

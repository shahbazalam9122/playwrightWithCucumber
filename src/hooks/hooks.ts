import { Before,After,BeforeAll,AfterAll, Status, AfterStep } from "@cucumber/cucumber";
import { chromium,Browser,Page, BrowserContext} from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browser/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const fs = require("fs-extra");

// let page:Page;
let browser:Browser;
let context: BrowserContext;

BeforeAll(async function()
{
      //  browser = await chromium.launch({headless:false});
      getEnv();
      browser = await invokeBrowser();
});

Before(async function({pickle}) {

  const scenarioName = pickle.name+pickle.id;  // This will return scenario name and scenario ID 
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        },
    });
      //  const page = await browser.newPage();
       const page = await context.newPage();
       pageFixture.page = page;
       pageFixture.logger = createLogger(options(scenarioName));
});

After(async function({pickle,result})
{

let videoPath:string;
let img:Buffer;

  

    // This will capture the screenshot when script got failed
//     if(result?.status==Status.FAILED)
//     {
//    const image = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}.png`,type:"png"});
//   this.attach(image,"image/png");
//     }

  console.log("Execution status is : "+result.status);
  const currDate = Date.now();
  img = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}_${currDate}.png`,type:"png"});
  videoPath = await pageFixture.page.video().path();

    await pageFixture.page.close();
  await context.close();
  
        await this.attach(
            img, "image/png"
        );

          await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );
  

});

AfterStep(async function({pickle,result})
{
  const currDate = Date.now();
  const afterStep:string ="afterStep";
   const image = await pageFixture.page.screenshot({path:`./test-results/screenshots/${pickle.name}_${afterStep}_${currDate}.png`,type:"png"});
  this.attach(image,"image/png");
});

AfterAll(async function()
{
  await browser.close();
  pageFixture.logger.close();
});
import {expect} from '@playwright/test';
import { Given, When, Then} from "@cucumber/cucumber";
import { pageFixture } from '../../hooks/pageFixture';

let errorMessage:any;

Given('User navigates to the application',async function() {
   await pageFixture.page.goto(process.env.BASEURL);
   pageFixture.logger.info("NAVIGATING TO THE URL");
});


Then('User click on the login link',async function() {
    
    await pageFixture.page.getByText(" Signup / Login").click();
});

Then('User enter the username as {string}',async function(username)
{
    await pageFixture.page.locator("//div[@class='login-form']//input[@type='email']").fill(username);
    pageFixture.logger.info("ENTERRED EMAIL..........");
});

Then('User enter the password as {string}',async function(password)
{
    await pageFixture.page.locator("//div[@class='login-form']//input[@type='password']").fill(password);
});

Then('User click on the login button',async function()
{
   await pageFixture.page.locator("//div[@class='login-form']//button").click();
})


When('Login should be successfull',async function()
{
    // await pageFixture.page.locator("#logout2").click();
   await expect(pageFixture.page.locator("a[href='/logout']")).toHaveText(" Logout")
 
});



When('User click on the login button for successful login',async function()
{
    await pageFixture.page.locator("button[onclick='logIn()']").click();

});

When('User click on the login button for fail login',async function()
{
    const dialogPromise = pageFixture.page.waitForEvent("dialog");

    await pageFixture.page.locator("button[onclick='logIn()']").click();

    const dialog = await dialogPromise;

    errorMessage = dialog.message();

    console.log("LOGIN ERROR MESSAGE IS : " + errorMessage);

    await dialog.accept();
});



Then('Login should fail',async function() {
  
await expect(pageFixture.page.locator("//div[@class='login-form']//p")).toHaveText("Your email or password is incorrect!")
});
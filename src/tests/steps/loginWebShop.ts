import { expect } from "@playwright/test";
import { Given,Then,When,setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from "../../hooks/pageFixture";


setDefaultTimeout(60 * 1000 * 2);
Given('User navigates to the site',async function() {

    await pageFixture.page.goto("https://demowebshop.tricentis.com/");

})
Then('User enter the email as {string}',async function(email)
{
     await pageFixture.page.locator("#Email").fill(email);
})

Then('User enter the password as {string} in the textbox',async function(passWord)
{
    await pageFixture.page.locator("#Password").fill(passWord);
})

Then('User click on the login button for signIn',async function() {
  
    await pageFixture.page.locator('input[value="Log in"]').click();
})

Then('Login should be success for Web Shop',async function()
{
                // Assert logout link is visible
            const logoutLink = pageFixture.page.locator('a[href="/logout"]');
            await expect(logoutLink).toBeVisible({ timeout: 5000 });
            console.log("Login Successful")
           
})
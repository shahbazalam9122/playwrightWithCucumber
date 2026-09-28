import { expect } from "@playwright/test";
import { Given,Then,When,setDefaultTimeout } from "@cucumber/cucumber";
import { pageFixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1000 * 2);
Given('User search the product {string}',async function(product)
{
        await pageFixture.page.waitForTimeout(3000);
        await pageFixture.page.locator("a[href='/products']").click();
       await pageFixture.page.getByPlaceholder("Search Product").fill(product);
       await pageFixture.page.locator("#submit_search").click();
        await pageFixture.page.waitForTimeout(2000);
       await expect(pageFixture.page.locator("//div[@class='productinfo text-center']//p").nth(0)).toContainText(product,{ignoreCase:true});
})

Then('user add product to the cart',async function()
{

    await pageFixture.page.waitForTimeout(2000);
    await pageFixture.page.locator("(//img[@alt='ecommerce website products'])[1]").hover();
    await pageFixture.page.locator("(//div[@class='product-overlay']//a)[1]").click();
    
})

Then('User verify the cart',async function()
{
    await pageFixture.page.waitForTimeout(2000);
    await expect(pageFixture.page.locator("(//div[@class='modal-body']//p)[1]")).toContainText("Your product has been added to cart.");
    await pageFixture.page.getByText("Continue Shopping").click();
    
})
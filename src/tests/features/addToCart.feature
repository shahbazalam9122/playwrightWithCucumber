# Feature: Add to cart
# Scenario: Login into the Web Shop application
# Given User navigates to the site
# And User click on the login button
# And User enter the email as "laura.taylor123@example.com"
# And User enter the password as "test123" in the textbox
# When User click on the login button for signIn
# Then Login should be success for Web Shop
# Scenario Outline: Search the product
# And User search the product "<product>"
# And User click on Add to Cart
# Examples:
# |product|
# |Laptop|
# |Book  |
# |Belt  |
Feature: Prodcuts test

  Background:
    Given User navigates to the application
    And User click on the login link

  Scenario Outline: Add to cart
    And User enter the username as "<username>"
    And User enter the password as "<password>"
    And User click on the login button
    Then Login should be successfull
    When User search the product "<product>"
    And user add product to the cart
    Then User verify the cart

    Examples:
      | username                     | password      | product |
      | playwrightcucumber@gmail.com | Shahbaz123    | Jeans   |
      | playwrightcucumber@gmail.com | WrongPassword | Tshirt  |

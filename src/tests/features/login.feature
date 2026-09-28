Feature: User Authentication tests

Background:
Given User navigates to the application
And User click on the login link

@smoke @reg
Scenario: Login should be success
And User enter the username as "playwrightcucumber@gmail.com"
And User enter the password as "Shahbaz123"
And User click on the login button
Then Login should be successfull


@smoke @reg
Scenario: Login should not be success
And User enter the username as "playwrightcucumber@gmail.com"
And User enter the password as "wrongPassword"
And User click on the login button
Then Login should fail
package com.salesforce.automation.tests;

import java.time.Duration;

import com.salesforce.automation.pages.LoginPage;
import io.qameta.allure.Description;
import io.qameta.allure.Feature;
import io.qameta.allure.Story;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.testng.Assert.assertTrue;

@Feature("Salesforce login")
public class InvalidLoginTest {
    private WebDriver driver;

    @BeforeMethod
    public void setUp() {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        if (Boolean.parseBoolean(System.getProperty("headless", "false"))) {
            options.addArguments("--headless=new");
        }
        try {
            driver = new ChromeDriver(options);
            driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(45));
        } catch (WebDriverException exception) {
            throw new IllegalStateException("Unable to start the Chrome WebDriver.", exception);
        }
    }

    @Test
    @Story("Invalid credentials")
    @Description("Verifies that invalid credentials are rejected with a login error.")
    public void invalidCredentialsShouldShowLoginError() {
        try {
            LoginPage loginPage = new LoginPage(driver).open();
            loginPage.login("invalid-test-user@example.invalid", "Invalid-Password-123!", false);
            String errorMessage = loginPage.waitForLoginError();
            assertTrue(errorMessage.toLowerCase().contains("check your username and password"),
                    "Salesforce should display its invalid-credentials message. Actual: " + errorMessage);
        } catch (WebDriverException exception) {
            throw new AssertionError("The invalid Salesforce login flow failed.", exception);
        }
    }

    @AfterMethod(alwaysRun = true)
    public void tearDown() {
        if (driver != null) {
            try {
                driver.quit();
            } catch (WebDriverException exception) {
                throw new IllegalStateException("Unable to close the Chrome WebDriver.", exception);
            }
        }
    }
}

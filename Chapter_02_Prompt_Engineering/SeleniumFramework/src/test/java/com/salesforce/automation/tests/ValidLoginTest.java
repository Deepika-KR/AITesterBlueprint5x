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
import org.testng.SkipException;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import static org.testng.Assert.assertFalse;
import static org.testng.Assert.assertTrue;

@Feature("Salesforce login")
public class ValidLoginTest {
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
    @Story("Valid credentials")
    @Description("Verifies that valid credentials complete the Salesforce login flow.")
    public void validCredentialsShouldOpenSalesforce() {
        String username = System.getenv("SF_USERNAME");
        String password = System.getenv("SF_PASSWORD");
        if (username == null || username.isBlank() || password == null || password.isBlank()) {
            throw new SkipException("Set SF_USERNAME and SF_PASSWORD to run the valid-login test.");
        }

        try {
            LoginPage loginPage = new LoginPage(driver).open();
            loginPage.login(username, password, true);
            assertFalse(loginPage.isLoginFormVisible(),
                    "The login form should no longer be visible after submitting valid credentials.");
            assertTrue(loginPage.hasLeftLoginPage(),
                    "Valid credentials should navigate away from the Salesforce login page.");
        } catch (WebDriverException exception) {
            throw new AssertionError("The valid Salesforce login flow failed.", exception);
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

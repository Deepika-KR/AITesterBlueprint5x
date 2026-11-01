package com.salesforce.automation.pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.WebDriverException;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage {
    private static final String LOGIN_URL = "https://login.salesforce.com/?locale=in";
    private static final Duration WAIT_TIMEOUT = Duration.ofSeconds(20);

    private final WebDriver driver;
    private final WebDriverWait wait;

    @FindBy(xpath = "//input[@id='username']")
    private WebElement usernameInput;

    @FindBy(xpath = "//input[@id='password']")
    private WebElement passwordInput;

    @FindBy(xpath = "//input[@id='Login'] | //button[@id='Login']")
    private WebElement loginButton;

    @FindBy(xpath = "//input[@id='rememberUn']")
    private WebElement rememberMeCheckbox;

    @FindBy(xpath = "//*[@id='error']")
    private WebElement loginError;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, WAIT_TIMEOUT);
        PageFactory.initElements(driver, this);
    }

    public LoginPage open() throws WebDriverException {
        driver.get(LOGIN_URL);
        wait.until(ExpectedConditions.visibilityOf(usernameInput));
        return this;
    }

    public void login(String username, String password, boolean rememberMe) throws WebDriverException {
        wait.until(ExpectedConditions.visibilityOf(usernameInput)).sendKeys(username);
        wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();

        wait.until(ExpectedConditions.visibilityOf(passwordInput)).sendKeys(password);

        WebElement rememberMeElement = wait.until(
                ExpectedConditions.visibilityOf(rememberMeCheckbox));
        if (rememberMeElement.isSelected() != rememberMe) {
            rememberMeElement.click();
        }

        wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
    }

    public String waitForLoginError() throws WebDriverException {
        return wait.until(ExpectedConditions.visibilityOf(loginError)).getText().trim();
    }

    public boolean hasLeftLoginPage() throws WebDriverException {
        return wait.until(currentDriver ->
                !currentDriver.getCurrentUrl().startsWith("https://login.salesforce.com/"));
    }

    public boolean isLoginFormVisible() throws WebDriverException {
        return driver.findElements(By.xpath("//input[@id='username'] | //input[@id='password']"))
                .stream()
                .anyMatch(WebElement::isDisplayed);
    }
}

# Modernization Plan: Java 25 Runtime Upgrade

**Project**: selenium-framework

## Technical Framework

- **Language**: Java 17 (target), upgrading to Java 25
- **Framework**: No application framework identified in the project POM
- **Build Tool**: Maven
- **Key Dependencies**: Selenium, TestNG, Allure TestNG

## Overview

Upgrade the Selenium framework's Java runtime/compiler target from Java 17 to
Java 25 while preserving existing application and test behavior. Keep the work
limited to Java-version-related build, runtime, documentation, and configuration
surfaces that are present in the project.

## Scope and Impact

- Address the assessment finding **“Java Version is not the latest LTS”**
  (`azure-java-version-02000`), verified against the current
  `pom.xml` compiler release of 17.
- Align Maven compilation and any directly related runtime/toolchain or
  documentation settings with Java 25 where those settings exist.
- Do not upgrade application frameworks or unrelated dependencies.
- Exclude the assessment's hardcoded-URL and Docker findings; this plan does not
  include cloud-readiness or containerization work.

## Validation

Run the Maven verification lifecycle on a Java 25 JDK, including a clean build
and the existing TestNG test suite. Confirm compilation targets Java 25 and
existing tests pass without changing their expected behavior. If the required
JDK or Maven environment is unavailable, report that prerequisite rather than
substituting validation on another Java version.

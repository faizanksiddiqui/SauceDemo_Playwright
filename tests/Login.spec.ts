import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { LoginPage } from '../utils/LoginPage';

const envPath = path.resolve(__dirname, '..', 'Env', 'Environment.json');
const env = JSON.parse(fs.readFileSync(envPath, 'utf-8'));

const SAUCE_URL = env.url;
const validUser = env.validUser;
const validPassword = env.validPassword;
const invalidUser = env.invalidUser;
const invalidPassword = env.invalidPassword;
const lockedUser = env.lockedUser;
const lockedPassword = env.lockedPassword;

test.describe('SauceDemo Login', () => {
  test('Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(SAUCE_URL);
    await login.loginWithValidCredentials(validUser, validPassword);
  });

  test('Login with invalid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(SAUCE_URL);
    await login.loginWithInvalidCredentials(invalidUser, invalidPassword);
  });
  test('Login with Empty Username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(SAUCE_URL);
    await login.loginWithEmptyUsername('', validPassword);
  });
  test('Login with Empty Password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(SAUCE_URL);
    await login.loginWithEmptyPassword(validUser, '');
  });
  test('Login with Locked User', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(SAUCE_URL);
    await login.loginWithInvalidCredentials(lockedUser, lockedPassword);
  });
});

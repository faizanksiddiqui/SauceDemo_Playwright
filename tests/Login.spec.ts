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

test.describe('SauceDemo Login', () => {
  test.only('Login with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto(SAUCE_URL);
  });

  test('Login with invalid credentials shows error', async ({ page }) => {
    const login = new LoginPage(page);
    
  });
});

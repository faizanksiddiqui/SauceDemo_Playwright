import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
	private page: Page;
	private userName: string;
	private password: string;
	private loginButton: string;
	private error: string;
	private title: string;
	private appLogo: string;
	constructor(page: Page) {
		this.page = page;
		this.userName = '#user-name';
		this.password = '#password';
		this.loginButton = '#login-button';
		this.appLogo = 'div.app_logo';
		this.error = 'h3[data-test="error"]';
		this.title = '.title';
	}

	async goto(url: string): Promise<void> {
		await this.page.goto(url);
		await this.page.waitForLoadState('networkidle');
		await expect(this.page).toHaveTitle('Swag Labs');
	}

	async login(username: string, password: string): Promise<void> {
		
	}

	async loginWithValidCredentials(validUser: string, validPassword: string): Promise<void> {
		await this.page.fill(this.userName, validUser);
		await this.page.fill(this.password, validPassword);
		await this.page.click(this.loginButton);
		await expect(this.page.locator(this.appLogo)).toBeVisible();
	}

	async loginWithInvalidCredentials(invalidUser: string, invalidPassword: string): Promise<void> {
        await this.page.fill(this.userName, invalidUser);
		await this.page.fill(this.password, invalidPassword);
		await this.page.click(this.loginButton);
		await expect(this.page.locator(this.error)).toBeVisible();
	}
	async loginWithEmptyUsername(invalidUser: string, invalidPassword: string): Promise<void> {
        await this.page.fill(this.userName, invalidUser);
		await this.page.fill(this.password, invalidPassword);
		await this.page.click(this.loginButton);
		await expect(this.page.locator(this.error)).toContainText('Username is required');
	}
	async loginWithEmptyPassword(invalidUser: string, invalidPassword: string): Promise<void> {
        await this.page.fill(this.userName, invalidUser);
		await this.page.fill(this.password, invalidPassword);
		await this.page.click(this.loginButton);
		await expect(this.page.locator(this.error)).toContainText('Password is required');
	}
	async loginWithLockedUser(invalidUser: string, invalidPassword: string): Promise<void> {
        await this.page.fill(this.userName, invalidUser);
		await this.page.fill(this.password, invalidPassword);
		await this.page.click(this.loginButton);
		await expect(this.page.locator(this.error)).toContainText('locked out');
	}
}


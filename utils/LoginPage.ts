import { type Page, type Locator, expect } from '@playwright/test';

export class LoginPage {
	private page: Page;
	private userName: string;
	private password: string;
	private loginButton: string;
	private error: string;
	private title: string;

	constructor(page: Page) {
		this.page = page;
		this.userName = '#user-name';
		this.password = '#password';
		this.loginButton = '#login-button';
		this.error = '[data-test="error"]';
		this.title = '.title';
	}

	async goto(url: string): Promise<void> {
		await this.page.goto(url);
		await this.page.waitForLoadState('networkidle');
		await expect(this.page).toHaveTitle('Swag Labs');
	}

	async login(username: string, password: string): Promise<void> {
		await this.page.fill(this.userName, username);
		await this.page.fill(this.password, password);
		await this.page.click(this.loginButton);
	}

	async loginWithValidCredentials(validUser: string, validPassword: string): Promise<void> {
		await this.login(validUser, validPassword);
	}

	async loginWithInvalidCredentials(invalidUser: string, invalidPassword: string): Promise<void> {
		await this.login(invalidUser, invalidPassword);
	}

	errorLocator(): Locator {
		return this.page.locator(this.error);
	}

	titleLocator(): Locator {
		return this.page.locator(this.title);
	}
}


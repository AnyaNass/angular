import { Component } from '@angular/core'

@Component({
	selector: 'app-password-validator',
	templateUrl: './PasswordValidator.component.html',
	styleUrls: ['./PasswordValidator.component.css']
})


export class PasswordValidatorComponent {
	password = "";
	passwordStrength = "";
	defaultBg: boolean = true;
	shortPassword: boolean = false;
	easyPassword: boolean = false;
	mediumPassword: boolean = false;
	strongPassword: boolean = false;

	onPasswordChange() {
		const letters = this.password.match(/[a-zA-Z]+/g);
		const symbols = this.password.match(/[!@#$%\^&*\+]/);
		const numbers = this.password.match(/\d+/g);

		const validator = {
			short: this.password.length < 8 && this.password.length !== 0,
			medium: (letters && symbols && !numbers) || (letters && !symbols && numbers) || (!letters && symbols && numbers),
			strong: letters && numbers && symbols,
			easy: (letters && !symbols && !numbers) || (!letters && symbols && !numbers) || (!letters && !symbols && numbers) && this.password.length > 8,
		}

		if (validator.short) {
			this.passwordStrength = "short";
			this.getColor();
			return;
		}
		if (validator.medium) {
			this.passwordStrength = "medium";
			this.getColor();
		}
		if (validator.strong) {
			this.passwordStrength = "strong";
			this.getColor()
		}
		if (validator.easy) {
			this.passwordStrength = "easy";
			this.getColor()
		}

		if (this.password === "") {
			this.passwordStrength = "";
			this.getColor();
		}
	};

	getColor() {
		switch (this.passwordStrength) {
			case "easy":
				this.easyPassword = true;
				this.mediumPassword = false;
				this.strongPassword = false;
				this.shortPassword = false;
				this.defaultBg = true;
				break;

			case "medium":
				this.mediumPassword = true;
				this.easyPassword = false;
				this.strongPassword = false;
				break;

			case "strong":
				this.strongPassword = true;
				this.easyPassword = false;
				this.mediumPassword = false;
				break;

			case "short":
				this.shortPassword = true;
				this.strongPassword = false;
				this.easyPassword = false;
				this.mediumPassword = false;
				this.defaultBg = false;
				break;

			default:
				this.defaultBg = true;
				this.shortPassword = false;
				this.strongPassword = false;
				this.easyPassword = false;
				this.mediumPassword = false;
		}
	}

}
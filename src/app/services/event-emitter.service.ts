import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
	providedIn: 'root'
})
export class EventEmitterService {
	toogleSignUp = new EventEmitter();
	toogleLogin = new EventEmitter();
	favoriteAdded = new EventEmitter();
	subsVar: Subscription;

	constructor() { }

	toogleSingUpEmitter() {
		this.toogleSignUp.emit();
	}

	toogleLoginEmitter() {
		this.toogleLogin.emit();
	}

	favoriteEmitter() {
		this.favoriteAdded.emit();
	}
}

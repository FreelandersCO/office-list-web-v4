import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
	providedIn: 'root'
})
export class EventEmitterService {
	toogleSignUp = new EventEmitter();
	toogleLogin = new EventEmitter();
	favoriteAdded = new EventEmitter();
	toogleDetails = new EventEmitter();
	toogleTourHeader = new EventEmitter();
	toogleTour = new EventEmitter();
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

	detailsEmitter() {
		this.toogleDetails.emit();
	}

	toogleTourEmitter() {
		this.toogleTour.emit();
	}

	toogleTourHeaderEmitter() {
		this.toogleTourHeader.emit();
	}
}

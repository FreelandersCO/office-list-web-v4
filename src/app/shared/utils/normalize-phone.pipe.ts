import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'normalizePhone',
	pure: true
})
export class NormalizePhone implements PipeTransform {

	transform(value: number) {
		return value !== null ? this.normalizePhone(value) : '';
	}
	normalizePhone(text) {

		text = text.replace(/-/g, '');

		return '+1' + text;
	}
}

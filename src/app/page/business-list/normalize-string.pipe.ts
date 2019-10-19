import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'normalizeString',
	pure: true
})
export class NormalizaeString implements PipeTransform {

	transform(value: number, args?) {
		return this.normalizeString(value);
	}
	normalizeString(text) {
		text = this.removeAccents(text);
		// reemplaza los caracteres '/' y ' ' (espacio en blanco) por el caracter '-' (guion)
		text = text.split(' ').join('-');
		text = text.split('/').join('-');
		// elimina cualquier caracter que no sea alfanumerico ni el caracter '-' (guion), como por ejemplo los simbolos (?, #, =, &, !, etc...)
		text = text.replace(/(?!\w|-)./g, '');
		// reemplaza cualquier aparicion de dos o mas guiones seguidos '--' por uno solo '-'
		text = text.replace(/[-]{2,}/g, '-');

		return text.toLowerCase();
	}

	removeAccents(str) {
		return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
	}
}

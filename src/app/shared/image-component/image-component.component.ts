import { Component, OnChanges, SimpleChanges, SimpleChange, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'office-list-image-component',
	template: `
    <img [defaultImage]="defaultImage" [lazyLoad]="_image" [ngClass]="classImage">
  `,
	styleUrls: ['./image-component.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ImageComponentComponent implements OnChanges {
	@Input() image;
	@Input() classCss = '';

	defaultImage = 'assets/images/image-default.png';
	_image;
	_classCss;
	classImage;
	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		const image: SimpleChange = changes.image;
		if (image.currentValue != null) {
			this._image = image.currentValue;
		}

		const classCss: SimpleChange = changes.classCss;
		if (classCss && classCss.currentValue != null) {
			this._classCss = classCss.currentValue;
			this.classImage = this.getClassImg();
		}
	}

	getClassImg() {
		return this._classCss.fullImage ? 'fullImage' : this._classCss.mapImage ? 'mapImage' : this._classCss.smallImage ? 'smallImage' : null;
	}
}

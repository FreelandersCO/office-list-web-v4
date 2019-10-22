import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
	selector: 'office-list-gallery-detail-office',
	templateUrl: './gallery-detail-office.component.html',
	styleUrls: ['./gallery-detail-office.component.scss']
})
export class GalleryDetailOfficeComponent implements OnChanges, OnInit {
	@Input() images;
	_images;
	constructor() { }

	ngOnInit() {
	}
	ngOnChanges(changes: SimpleChanges) {
		const images: SimpleChange = changes.images;
		if (images.currentValue !== null) {
			this._images = images.currentValue.splice(0,2);
		}
	}
}

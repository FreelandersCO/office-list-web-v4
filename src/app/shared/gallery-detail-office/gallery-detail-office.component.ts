import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
	selector: 'office-list-gallery-detail-office',
	templateUrl: './gallery-detail-office.component.html',
	styleUrls: ['./gallery-detail-office.component.scss']
})
export class GalleryDetailOfficeComponent implements OnChanges {
	@Input() images;
	@Input() bcId;
	_images;
	_bcId;
	openModalGallery = false;
	constructor() { }

	ngOnChanges(changes: SimpleChanges) {
		const images: SimpleChange = changes.images;
		const bcId: SimpleChange = changes.bcId;
		if (images.currentValue !== null) {
			this._images = images.currentValue;
		}
		if (bcId.currentValue !== null) {
			this._bcId = bcId.currentValue;
		}
	}

	toogleModalGallery() {
		this.openModalGallery = !this.openModalGallery;
	}
}

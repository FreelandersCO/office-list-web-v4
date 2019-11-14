import {
	Component,
	ViewChild,
	QueryList,
	ElementRef,
	Input,
	ViewChildren,
	OnChanges,
	SimpleChanges,
	SimpleChange
} from '@angular/core';

@Component({
	selector: 'office-list-bc-slider',
	templateUrl: './bc-slider.component.html',
	styleUrls: ['./bc-slider.component.scss']
})
export class BcSliderComponent implements OnChanges {
	@Input() images;
	@Input() fullImage = false;
	@Input() map = false;
	@ViewChild('slider', { static: false }) slidesContainer: ElementRef<HTMLDivElement>;
	@ViewChildren('item') items: QueryList<ElementRef<HTMLDivElement>>;
	isFirst = true;
	isLast = false;
	slidesIndex = 0;
	_images;

	get currentItem(): ElementRef<HTMLDivElement> {
		return this.items.find((item, index) => index === this.slidesIndex);
	}

	ngOnChanges(changes: SimpleChanges) {
		const images: SimpleChange = changes.images;
		if (images.currentValue != null) {
			this._images = images.currentValue;
		}
	}

	onClickLeft() {
		const width = this.currentItem.nativeElement.offsetWidth;
		this.slidesContainer.nativeElement.scrollLeft = this.slidesContainer.nativeElement.scrollLeft - width;

		if (this.slidesIndex > 0) {
			this.slidesIndex--;
		}
	}

	onClickRight() {
		this.slidesContainer.nativeElement.scrollLeft += this.currentItem.nativeElement.offsetWidth;

		if (this.slidesIndex < this.items.length - 1) {
			this.slidesIndex++;
		}
	}
}

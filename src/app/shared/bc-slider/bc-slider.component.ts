import {
	Component,
	ViewChild,
	QueryList,
	ElementRef,
	Input,
	ViewChildren
} from '@angular/core';

@Component({
	selector: 'office-list-bc-slider',
	templateUrl: './bc-slider.component.html',
	styleUrls: ['./bc-slider.component.scss']
})
export class BcSliderComponent {
	@Input() images;
	@Input() fullImage = false;
	@Input() map = false;
	@ViewChild('slider', { static: false }) slidesContainer: ElementRef<HTMLDivElement>;
	@ViewChildren('item') items: QueryList<ElementRef<HTMLDivElement>>;
	isFirst = true;
	isLast = false;
	slidesIndex = 0;

	get currentItem(): ElementRef<HTMLDivElement> {
		return this.items.find((item, index) => index === this.slidesIndex);
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

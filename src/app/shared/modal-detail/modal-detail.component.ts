import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'office-list-modal-detail',
	templateUrl: './modal-detail.component.html',
	styleUrls: ['./modal-detail.component.scss']
})
export class ModalDetailComponent implements OnInit {
	public modalDetailInfo: boolean;

	constructor() {
		this.modalDetailInfo = true;
	}

	ngOnInit() {
	}

	public onCloseClick() {
		this.modalDetailInfo = false;
	}
}

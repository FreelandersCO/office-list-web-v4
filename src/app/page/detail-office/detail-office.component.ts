import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'office-list-detail-office',
  templateUrl: './detail-office.component.html',
  styleUrls: ['./detail-office.component.scss']
})
export class DetailOfficeComponent implements OnInit {
	config: SwiperOptions = {
		pagination: { el: '.swiper-pagination', clickable: true },
		spaceBetween: 30
	  };
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '@app/services/api-services.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'office-list-page-list-your-office',
  templateUrl: './page-list-your-office.component.html',
  styleUrls: ['./page-list-your-office.component.scss']
})
export class PageListYourOfficeComponent implements OnInit {

	constructor(
		private api: ApiServicesService,
		private titleService: Title,
		private meta: Meta) { }

	ngOnInit() {
		this.api.getPageMeta(
			'page',
			'list-your-office'
		).subscribe(result => this.processDataSEO(result));
	}
	processDataSEO(result) {
		// SEO
		this.titleService.setTitle(result.metatitle);
		this.meta.addTag({ name: 'description', content: result.metadescription });
	}
}

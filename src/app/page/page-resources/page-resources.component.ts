import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '@app/services/api-services.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'office-list-page-resources',
  templateUrl: './page-resources.component.html',
  styleUrls: ['./page-resources.component.scss']
})
export class PageResourcesComponent implements OnInit {

	constructor(
		private api: ApiServicesService,
		private titleService: Title,
		private meta: Meta) { }

	ngOnInit() {
		this.api.getPageMeta(
			'page',
			'resources'
		).subscribe(result => this.processDataSEO(result));
	}
	processDataSEO(result) {
		// SEO
		this.titleService.setTitle(result.metatitle);
		this.meta.addTag({ name: 'description', content: result.metadescription });
	}

}

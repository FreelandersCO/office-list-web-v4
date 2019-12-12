import { Component, OnInit } from '@angular/core';
import { ApiServicesService } from '@app/services/api-services.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
	selector: 'office-list-page-about',
	templateUrl: './page-about.component.html',
	styleUrls: ['./page-about.component.scss']
})
export class PageAboutComponent implements OnInit {
	public detailInfoTeam = false;
	public detailInfoTeamg = false;
	public detailInfoTeama = false;
	public detailInfoTeamm = false;
	public detailInfoTeamj = false;

	constructor(
		private api: ApiServicesService,
		private titleService: Title,
		private meta: Meta) { }

	ngOnInit() {
		this.api.getPageMeta(
			'page',
			'about'
		).subscribe(result => this.processDataSEO(result));
	}
	processDataSEO(result) {
		// SEO
		this.titleService.setTitle(result.metatitle);
		this.meta.addTag({ name: 'description', content: result.metadescription });
	}
	showModalInformationU() {
		this.detailInfoTeam = true;
	}
	showModalInformationG() {
		this.detailInfoTeamg = true;
	}
	showModalInformationA() {
		this.detailInfoTeama = true;
	}
	showModalInformationM() {
		this.detailInfoTeamm = true;
	}
	showModalInformationJ() {
		this.detailInfoTeamj = true;
	}

	closeModal() {
		this.detailInfoTeam = false;
	}

	closeModalG() {
		this.detailInfoTeamg = false;
	}
	closeModalA() {
		this.detailInfoTeama = false;
	}
	closeModalM() {
		this.detailInfoTeamm = false;
	}
	closeModalJ() {
		this.detailInfoTeamj = false;
	}

}

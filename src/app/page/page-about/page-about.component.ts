import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
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

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceStorageService } from '@app/services/storage.service';

@Component({
	selector: 'office-list-mylist-token',
	template: '<p>mylist-token works!</p>'
})
export class MylistTokenComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private sessionStorage: ServiceStorageService,
		public router: Router) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
			if (params && params['token'] && params['token'] !== null) {
				this.sessionStorage.setItem('ol_tk', params['token']);
				this.router.navigate(['/my-list/']);
			}
		});
	}

}

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'office-list-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public status = false;
    constructor() { }

    ngOnInit() {
    }

    openMenu() {
        this.status = !this.status;
    }
}

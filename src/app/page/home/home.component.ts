import { Component, OnInit } from '@angular/core';
import { trigger,state,style,animate,transition,query,animateChild } from '@angular/animations';


@Component({
  selector: 'office-list-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
	trigger('ngIfAnimation', [
	  transition(':enter, :leave', [
		query('@*', animateChild())
	  ])
	]),
	trigger('easeInOut', [
	  transition('void => *', [
		  style({
			height: 0,
			opacity: 0
		  }),
		  animate("500ms ease-in", style({
			height: 100,
			opacity: 1
		  }))
	  ]),
	  transition('* => void', [
		  style({
			height: 100,
			opacity: 1
		  }),
		  animate("500ms ease-in", style({
			height: 0,
			opacity: 0	
		  }))
		])
	  ])
  ]
})
export class HomeComponent implements OnInit {
	public formPressedShow:boolean = false;
	public pressedShow:any = 'Show';
	  
	constructor() { }

	ngOnInit() {
	}

	toggleFormPressed() {
		this.formPressedShow = !this.formPressedShow;
	
		if(this.formPressedShow)  
		  this.pressedShow = "Hide";
		else
		  this.pressedShow = "Show";
	}
	
}

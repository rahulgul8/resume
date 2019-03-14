import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  constructor(public viewContainer: ViewContainerRef) { }

  ngOnInit() {
  }

}

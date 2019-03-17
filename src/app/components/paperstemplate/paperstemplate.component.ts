import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paperstemplate',
  templateUrl: './paperstemplate.component.html',
  styleUrls: ['./paperstemplate.component.css']
})
export class PaperstemplateComponent implements OnInit {


  @Input()
  dataList = [];

  constructor() { }

  ngOnInit() {
  }

}

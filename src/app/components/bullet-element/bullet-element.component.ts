import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';



@Component({
  selector: 'bullet-element',
  templateUrl: './bullet-element.component.html',
  styleUrls: ['./bullet-element.component.css']
})
export class BulletElementComponent implements OnInit {

  @Input()
  editable: boolean = true;

  @Input()
  hideIfEmpty: boolean = false;

  @Input()
  placeholder: string;


  constructor() { }


  @Input()
  points: string[] = [];

  ngOnInit() {
  }


}

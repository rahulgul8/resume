import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit, AfterViewInit {

  constructor() { }

  @Input()
  data;

  @Input()
  borderColor: 'warn' | 'primary' | 'accent' | 'text' = 'primary';

  @Input()
  backgroundColor: 'warn' | 'primary' | 'accent' | 'text' | 'background' = 'background';

  ngOnInit() {
    this.data;
  }

  ngAfterViewInit() {

  }
}

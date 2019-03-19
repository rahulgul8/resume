import { Component, OnInit, Optional, Input, ViewChild } from '@angular/core';
import { DisabledDirective, resolve } from 'src/app/directives/disabled.directive';
import { template } from '@angular/core/src/render3';


@Component({
  selector: 'chipgroup',
  templateUrl: './chipgroup.component.html',
  styleUrls: ['./chipgroup.component.css']
})
export class ChipgroupComponent implements OnInit {

  disabledDirective: DisabledDirective;

  @Input()
  editable: boolean = true;

  @ViewChild('chip')
  template;

  @Input()
  dataList = [];

  @Input()
  popover: boolean;

  blur() {
    console.log('chip group')
    this.popover = false;
  }

  constructor(@Optional() optDisabled: DisabledDirective) {
    this.disabledDirective = resolve(optDisabled);
    this.disabledDirective.onChange(this.disabledDirective, (newValue) => {
      this.editable = !newValue;
    });
  }

  ngOnInit() {
  }

}

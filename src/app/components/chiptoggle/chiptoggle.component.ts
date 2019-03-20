import { Component, OnInit, Input, ViewChild, Optional, HostListener, IterableDiffer, IterableDiffers } from '@angular/core';
import { DisabledDirective, resolve } from 'src/app/directives/disabled.directive';

@Component({
  selector: 'chiptoggle',
  templateUrl: './chiptoggle.component.html',
  styleUrls: ['./chiptoggle.component.css']
})
export class ChiptoggleComponent implements OnInit {

  disabledDirective: DisabledDirective;

  @Input()
  editable: boolean = false;

  isEditable: boolean;

  @Input()
  multiple: boolean = false;

  @ViewChild('chip')
  template;

  dataListArray = [];

  @Input()
  set dataList(dataList: Array<any>) {
    this.dataListArray = dataList;
    this.updateData(false);
  }

  updateData(visibile) {
    this.setSelected();
    this.setVisibility(visibile);
  }

  get dataList() {
    return this.dataListArray;
  }

  setVisibility(visibile: boolean) {
    this.dataList.filter(d => !d.isSelected).forEach(d => d.show = visibile);
  }

  setSelected() {
    if (this.dataList.filter(d => d.isSelected).length == 0) {
      this.dataList[0].isSelected = true;
    }
  }

  @HostListener('mouseover', ['$event'])
  mouseOver(event) {
    this.setVisibility(true);
  }

  @HostListener('mouseout', ['$event'])
  mouseOut(event) {
    this.setVisibility(false);
  }

  clicked(event, data) {
    let index = this.dataList.indexOf(data);
    if (data.isSelected && this.dataList.filter(d => d.isSelected).length <= 1) {
      return;
    }
    data.isSelected = !data.isSelected;
    if (!this.multiple) {
      for (let i = 0; i < this.dataList.length; i++) {
        if (i != index) {
          this.dataList[i].isSelected = false;
        }
      }
    }
  }

  @Input()
  popover: boolean;

  constructor(@Optional() optDisabled: DisabledDirective, _iterableDiffers: IterableDiffers) {
    this.disabledDirective = resolve(optDisabled);
    this.disabledDirective.onChange(this.disabledDirective, (newValue) => {
      if (this.editable) { this.isEditable = !newValue; }
    });
    this.iterableDiffer = _iterableDiffers.find([]).create(null);
  }

  iterableDiffer: IterableDiffer<any>;



  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.dataList);
    if (changes) {
      this.updateData(false);
    }
  }

  ngOnInit() {
    this.isEditable = this.editable;
  }

}

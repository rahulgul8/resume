import { Component, OnInit, Input, HostBinding, ElementRef, ViewChild, OnChanges, SimpleChanges, AfterViewInit, ViewChildren, ChangeDetectorRef, Optional, HostListener, EventEmitter, Output } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { ParentElement } from '../parent-element';
import { TooltipDirective } from 'src/app/modules/tooltip/tooltip.directive';
import { DisabledDirective, resolve } from 'src/app/directives/disabled.directive';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent extends ParentElement implements OnInit, OnChanges {


  @Output()
  valueChange = new EventEmitter<string>();

  constructor(public element: ElementRef, public themeService: ThemeService, changeDetector: ChangeDetectorRef, @Optional() optDisabled: DisabledDirective) {
    super(element, themeService, changeDetector, optDisabled);
  }

  public classes = ['element'];

  model;

  ngOnInit() {
    this.updateData();
    // this.model = this.value;
  }



  displayValue;

  input(event) {
    // console.log(event);
    // this.value = event.target.innerText;
    // // if (!this.value.trim()) {
    // //   event.target.innerHTML = '';
    // // }
    if (this.data) {
      this.data.value = event.target.innerText;
    }
    this.valueChange.emit(event.target.innerText);
  }


} 

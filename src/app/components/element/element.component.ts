import { Component, OnInit, Input, HostBinding, ElementRef, ViewChild, OnChanges, SimpleChanges, AfterViewInit, ViewChildren, ChangeDetectorRef, Optional, HostListener, EventEmitter, Output } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { ParentElement } from '../parent-element';
import { TooltipDirective } from 'src/app/modules/tooltip/tooltip.directive';
import { DisabledDirective, resolve } from 'src/app/directives/disabled.directive';
import { EventsService } from 'src/app/services/events.service';


@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent extends ParentElement implements OnInit, OnChanges {


  @Output()
  valueChange = new EventEmitter<string>();

  constructor(public element: ElementRef, public themeService: ThemeService, changeDetector: ChangeDetectorRef, private eventsService: EventsService, @Optional() optDisabled: DisabledDirective) {
    super(element, themeService, changeDetector, optDisabled);
  }

  public classes = ['element'];

  model;

  currentClientHeight = 0;

  ngOnInit() {
    this.updateData();
    this.updateClientHeight();
  }


  updateClientHeight() {
    this.currentClientHeight = this.element.nativeElement.clientHeight;
  }


  displayValue;


  checkLineWrap() {
    if (this.element.nativeElement.clientHeight != this.currentClientHeight) {
      this.eventsService.broadcast('linewrap', this.element);
      this.updateClientHeight();
    }
  }

  input(event) {
    this.checkLineWrap();
    if (this.data) {
      this.data.value = event.target.innerText;
    }
    this.valueChange.emit(event.target.innerText);
  }


} 

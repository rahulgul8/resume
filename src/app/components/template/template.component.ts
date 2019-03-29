import { Component, OnInit, Input, ElementRef, ViewChild, ContentChildren, QueryList, AfterViewInit, OnChanges, HostListener, Optional, ViewChildren, ComponentRef, ViewContainerRef, TemplateRef, HostBinding, Output, EventEmitter } from '@angular/core';
import { ElementComponent } from '../element/element.component';
import { BulletElementComponent } from '../bullet-element/bullet-element.component';
import { Subject, Observable, pipe } from 'rxjs';
import { ParentElement } from '../parent-element';
import { DisabledDirective, resolve } from 'src/app/directives/disabled.directive';
import { FormatterDirective } from 'src/app/directives/formatter.directive';
import { ShadowComponent } from '../shadow/shadow.component';
import { PaperComponent } from '../paper/paper.component';
import { DomService } from 'src/app/services/dom.service';
import { clone, cloneForTemplating } from 'src/app/constants/data';
import { TemplateEvent, PopoverEvent, UserEvents } from 'src/app/constants/events';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  disabledDirective: DisabledDirective;

  constructor(@Optional() optDisabled: DisabledDirective, private dom: DomService) {
    this.disabledDirective = resolve(optDisabled);
    this.disabledDirective.onChange(this.disabledDirective, (newValue) => {
      this.editable = !newValue;
    });
  }

  @Output() templateEvent: EventEmitter<TemplateEvent> = new EventEmitter<TemplateEvent>(true);

  @Input()
  dataList = [];

  @Input() popover;

  @Input() divstyle;

  @Input() templates = [];


  popoverTemplates = [];

  ngOnInit() {
    this.popoverTemplates = this.dataList.filter(d => d.popover).map(d => d.template).filter(this.onlyUnique);
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  @Input() template: TemplateRef<any>;

  handleEvents(event: PopoverEvent, index, data) {

    switch (event.name) {
      case UserEvents.add: this.add(event, data, index); break;
      case UserEvents.delete: this.remove(event, index, data);
    }
    this.templateEvent.emit(new TemplateEvent(event, index, data));
  }

  add(event, data, index) {
    if (event.param && this.template == undefined) {
      data = this.dataList.filter(t => t.template == event.param).pop();
    }
    this.dataList.splice(index + 1, 0, cloneForTemplating(data));
  }




  getTemplate(name) {
    let templ = this.templates.filter(t => t.name == name);
    return templ[0].template;
  }

  remove(event, index, data) {
    if (!isNaN(index) && index < this.dataList.length) {
      if (this.dataList[index].cloned) {
        this.dataList.splice(index, 1);
      }
      else {
        this.dataList[index].hide = true;
      }
    }
  }

  getDataList() {
    return this.dataList.filter(d => !d.hide);
  }

  @Input()
  editable: boolean = true;
}

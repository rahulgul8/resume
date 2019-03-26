import { Component, OnInit, Input, ElementRef, ViewChild, ContentChildren, QueryList, AfterViewInit, OnChanges, HostListener, Optional, ViewChildren, ComponentRef, ViewContainerRef, TemplateRef, HostBinding } from '@angular/core';
import { ElementComponent } from '../element/element.component';
import { BulletElementComponent } from '../bullet-element/bullet-element.component';
import { Subject, Observable, pipe } from 'rxjs';
import { ParentElement } from '../parent-element';
import { DisabledDirective, resolve } from 'src/app/directives/disabled.directive';
import { FormatterDirective } from 'src/app/directives/formatter.directive';
import { ShadowComponent } from '../shadow/shadow.component';
import { PaperComponent } from '../paper/paper.component';
import { DomService } from 'src/app/services/dom.service';
import { clone } from 'src/app/constants/data';


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

  handleEvents(event, index, data) {
    switch (event.name) {
      case 'add': this.add(event, data, index); break;
      case 'delete': this.remove(event, index, data);
    }
  }

  add(event, data, index) {
    if (event.param && this.template == undefined) {
      data = this.dataList.filter(t => t.template == event.param).pop();
    }
    let cloned = clone(data);
    cloned.hide = false;
    this.dataList.splice(index + 1, 0, cloned);
  }

  getTemplate(name) {
    let templ = this.templates.filter(t => t.name == name);
    return templ[0].template;
  }

  remove(event, index, data) {
    if (!isNaN(index) && index < this.dataList.length) {
      // this.dataList.splice(index, 1);
      this.dataList[index].hide = true;
    }
  }

  getDataList() {
    return this.dataList.filter(d => !d.hide);
  }

  @Input()
  editable: boolean = true;
}

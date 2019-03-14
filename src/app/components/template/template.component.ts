import { Component, OnInit, Input, ElementRef, ViewChild, ContentChildren, QueryList, AfterViewInit, OnChanges, HostListener, Optional, ViewChildren, ComponentRef } from '@angular/core';
import { ElementComponent } from '../element/element.component';
import { BulletElementComponent } from '../bullet-element/bullet-element.component';
import { Subject, Observable, pipe } from 'rxjs';
import { ParentElement } from '../parent-element';
import { DisabledDirective, resolve } from 'src/app/directives/disabled.directive';
import { FormatterDirective } from 'src/app/directives/formatter.directive';
import { ShadowComponent } from '../shadow/shadow.component';
import { PaperComponent } from '../paper/paper.component';
import { DomService } from 'src/app/services/dom.service';


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

  @ViewChildren(FormatterDirective) all: QueryList<FormatterDirective>;

  @ViewChild(PaperComponent)
  paper: PaperComponent;


  ngOnInit() {
  }

  @Input()
  editable: boolean = true;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.all.forEach((element) => {
        let shadow: ComponentRef<ShadowComponent> = this.dom.appendChild(this.paper.viewContainer, ShadowComponent, 'shadowElement', element.element.element.nativeElement);
        element.element.shadowElement = shadow.instance;
      });

    });

  }
}

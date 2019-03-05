import { Component, OnInit, Input, ElementRef, ViewChild, ContentChildren, QueryList, AfterViewInit } from '@angular/core';
import { ElementComponent } from '../element/element.component';
import { BulletElementComponent } from '../bullet-element/bullet-element.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterViewInit {


  @ViewChild('container') parent: ElementRef;

  subject: Subject<boolean> = new Subject<boolean>();


  @ContentChildren(ElementComponent) elements: QueryList<ElementComponent>;

  @ContentChildren(BulletElementComponent) bullets: QueryList<BulletElementComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.updateParentInputOnChildren(this.elements, 'editable', this.editable)
    // this.updateParentInputOnChildren(this.bullets, 'editable', this.editable)
  }

  updateParentInputOnChildren(elements, paramName, value) {
    if (elements && value) {
      elements.forEach((element) => {
        setTimeout(() => {
          debugger;
          element[paramName] = element[paramName] || value;
        }, 0);
      });
    }
  }

  @Input()
  editable: boolean = true;

  focusout(event) {
    debugger;
    if (!this.parent.nativeElement.contains(event.relatedTarget))
      this.editable = false
  }
}

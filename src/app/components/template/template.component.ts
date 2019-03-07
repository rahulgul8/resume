import { Component, OnInit, Input, ElementRef, ViewChild, ContentChildren, QueryList, AfterViewInit, OnChanges, HostListener } from '@angular/core';
import { ElementComponent } from '../element/element.component';
import { BulletElementComponent } from '../bullet-element/bullet-element.component';
import { Subject, Observable, pipe } from 'rxjs';
import { ParentElement } from '../parent-element';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('container') parent: ElementRef;

  subject: Subject<boolean> = new Subject<boolean>();


  @ContentChildren(ElementComponent) elements: QueryList<ElementComponent>;

  @ContentChildren(BulletElementComponent) bullets: QueryList<BulletElementComponent>;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.updateEditableOnChildren();
  }

  updateEditableOnChildren() {
    this.updateParentInputOnChildren(this.elements, 'editable', this.editable);
    this.updateParentInputOnChildren(this.bullets, 'editable', this.editable);
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if (changes['editable']) {
      this.updateEditableOnChildren();
    }
  }

  updateParentInputOnChildren(elements, paramName, value) {
    if (elements && value != undefined) {
      elements.forEach((element) => {
        setTimeout(() => {
          element[paramName] = value;
        }, 0);
      });
    }
  }

  click(event) {
    this.editable = true;
    this.updateEditableOnChildren();
  }

  @Input()
  editable: boolean = true;


  focusout(event) {
    if (!this.parent.nativeElement.contains(event.relatedTarget)) {
      this.editable = false;
      this.updateEditableOnChildren();
    }
  }

  // @HostListener('document:click', ['$event.target'])
  globalClickOutListener(event) {
    if (!this.parent.nativeElement.contains(event) && this.editable) {
      this.editable = false;
      this.updateEditableOnChildren();
    }
  }

}

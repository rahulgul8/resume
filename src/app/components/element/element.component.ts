import { Component, OnInit, Input, HostBinding, ElementRef, ViewChild, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { ParentElement } from '../parent-element';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent extends ParentElement implements OnInit, OnChanges {

  hidden: boolean = false;

  @ViewChild('divTag') divTag: ElementRef; // DOM element

  constructor(public themeService: ThemeService) {
    super(themeService);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editable'] && !changes['editable'].currentValue && this.isHideIfEmpty && !this.value) {
      this.hidden = true;
    } else {
      this.hidden = false;
    }
  }

  click() {
    setTimeout(_ => this.divTag.nativeElement.focus(), 0);
  }
}

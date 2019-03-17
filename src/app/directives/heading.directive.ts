import { Directive, ElementRef, Input, OnInit, Renderer2, HostBinding, HostListener, OnChanges } from '@angular/core';

import { ThemeService } from '../services/theme.service';
import { ParentDirective } from './parent.directive';
import { isBoolean } from 'util';

@Directive({
  selector: '[heading]'
})
export class HeadingDirective extends ParentDirective implements OnInit, OnChanges {

  constructor(public renderer: Renderer2, hostElement: ElementRef, public themeService: ThemeService) {
    super(renderer, hostElement, ['heading'])
  }



  @Input()
  set heading(heading: boolean) {
    if (isBoolean(heading)) { this.isEnabled = heading; }
  }

  get heading() {
    return this.isEnabled;
  }

}

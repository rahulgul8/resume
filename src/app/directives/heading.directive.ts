import { Directive, ElementRef, Input, OnInit, Renderer2, HostBinding, HostListener } from '@angular/core';
import { ParentDirective } from './parent.directive';
import { ThemeService } from '../services/theme.service';

@Directive({
  selector: '[heading]'
})
export class HeadingDirective extends ParentDirective {

  @HostBinding('style.color') get color() {
    return this.themeService.theme.backgroundColor;
  };

  constructor(private renderer: Renderer2, hostElement: ElementRef, private themeService: ThemeService) {
    super(renderer, hostElement, ['heading'])
  }


  // @HostBinding('style.border') border: string;
  // @HostListener('mouseover') onMouseOver() {
  //   this.border = '5px solid green';
  // }

  // @HostListener('mouseout') onMouseExit() {
  //   this.border = null;
  // }
}

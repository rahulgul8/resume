import { Directive, HostBinding, Optional } from '@angular/core';
import { ShadowComponent } from '../components/shadow/shadow.component';
import { ElementComponent } from '../components/element/element.component';
import { BulletElementComponent } from '../components/bullet-element/bullet-element.component';
import { ParentElement } from '../components/parent-element';

@Directive({
  selector: '[appFormatter]'
})
export class FormatterDirective {

  element: ParentElement;

  constructor(@Optional() element: ElementComponent, @Optional() bullet: BulletElementComponent) {
    if (element) {
      this.element = element;
    } else if (bullet) {
      this.element = bullet;
    }
  }

  // @HostBinding('style.left')
  // get left(): string {
  //   if (this.element && this.element.shadowElement) {
  //     return this.element.leftoffset + this.element.shadow.getBoundingClientRect().left + "px";
  //   }
  //   return "0px";

  // }

  // @HostBinding('style.top')
  // get top(): string {
  //   if (this.element && this.element.shadowElement) {
  //     return this.element.topoffset + this.element.shadow.getBoundingClientRect().top + "px";
  //   }
  //   return "0px";
  // }

}

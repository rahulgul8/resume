import { Directive, ViewContainerRef, ElementRef, DoCheck, Input, ComponentRef } from '@angular/core';
import { DomService } from '../services/dom.service';
import { PagenumberComponent } from '../components/pagenumber/pagenumber.component';

@Directive({
  selector: '[appFooter]'
})
export class FooterDirective implements DoCheck {

  value;

  @Input()
  set appFooter(value: number) {
    // this.value = this.convertor(value);
    this.value = value;
  }

  get appFooter(): number {
    return this.value;
  }

  lastPage = 0;
  comp: Array<ComponentRef<PagenumberComponent>> = [];

  ngDoCheck(): void {
    let currentHeight = this.element.nativeElement.clientHeight;
    let number = Math.ceil(currentHeight / this.appFooter);
    if (this.lastPage < number) {
      let i = this.lastPage;
      this.lastPage = number;
      setTimeout(() => {
        for (; i < number; i++) {
          this.comp.push(this.dom.appendComponentToBody(PagenumberComponent, 'data', {
            pagenumber: i,
            offset: this.value,
            element: this.element.nativeElement
          }));
        }
      });
    }
    else if (this.lastPage > number) {
      for (let i = this.lastPage; i > number; i--) {
        this.comp.pop().destroy();
      }
      this.lastPage = number;
    }
  }


  convertor(value) {
    return value * 37.79527559055118;
  }

  constructor(private container: ViewContainerRef, private dom: DomService, private element: ElementRef) { }


}

import { Directive, OnInit, Input } from '@angular/core';
import { ElementComponent } from '../components/element/element.component';

@Directive({
  selector: '[injectClasses]'
})
export class ClassInjector implements OnInit {

  @Input()
  injectClasses = [];

  ngOnInit(): void {
    if (this.injectClasses) {
      this.injectClasses.forEach(c => { this.hostElement.classes.push(c) });
    }
  }

  constructor(private hostElement: ElementComponent) {
  }

}

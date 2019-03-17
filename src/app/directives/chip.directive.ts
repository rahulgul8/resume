import { Directive, Input, Renderer2, ElementRef, OnInit } from '@angular/core';
import { ParentDirective } from './parent.directive';
import { isBoolean } from 'util';
import { ThemeService } from '../services/theme.service';
import { ElementComponent } from '../components/element/element.component';

@Directive({
  selector: '[chip]'
})
export class ChipDirective implements OnInit{

  ngOnInit(): void {
    this.hostElement.classes=['chip'];
  }

  constructor(private hostElement: ElementComponent, public themeService: ThemeService) {
  }


  isEnabled: boolean = true;

  @Input()
  set chip(heading: boolean) {
    if (isBoolean(heading)) { this.isEnabled = heading; }
  }

  get chip() {
    return this.isEnabled;
  }
}

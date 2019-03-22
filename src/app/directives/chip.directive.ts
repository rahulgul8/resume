import { Directive, Input, Renderer2, ElementRef, OnInit, HostBinding } from '@angular/core';
import { ParentDirective } from './parent.directive';
import { isBoolean } from 'util';
import { ThemeService } from '../services/theme.service';
import { ElementComponent } from '../components/element/element.component';

@Directive({
  selector: '[chip]'
})
export class ChipDirective implements OnInit {

  ngOnInit(): void {
    this.hostElement.classes.push('chip');
  }

  constructor(private hostElement: ElementComponent, public themeService: ThemeService) {
    this.hostElement.backgroundColor = this.hostElement.borderColor;
    this.hostElement.color = "background";
  }


  isEnabled: boolean = true;

  @Input()
  set chip(heading: boolean) {
    if (isBoolean(heading)) { this.isEnabled = heading; }
  }

  get chip() {
    return this.isEnabled;
  }

  @HostBinding('style.display')
  get display() {
    return 'inline-block';
  }

  @HostBinding('style.margin')
  get margin() {
    return '1px';
  }

  @HostBinding('style.maxWidth')
  get maxWidth() {
    return '100%';
  }
}

import { Directive, Input } from '@angular/core';
import { ElementComponent } from '../components/element/element.component';
import { ThemeService } from '../services/theme.service';
import { isBoolean } from 'util';

@Directive({
  selector: '[dialog]'
})
export class DialogDirective {

  ngOnInit(): void {
    this.hostElement.classes.push('dialog');
    this.hostElement.classes.push('chip');
  }

  constructor(private hostElement: ElementComponent, public themeService: ThemeService) {
  }


  isEnabled: boolean = true;

  @Input()
  set dialog(heading: boolean) {
    if (isBoolean(heading)) { this.isEnabled = heading; }
  }

  get dialog() {
    return this.isEnabled;
  }

}

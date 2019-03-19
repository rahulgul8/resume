import { Directive, Input, HostBinding } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Directive({
  selector: '[appTheme]'
})
export class ThemeDirective {

  @Input()
  borderColor: 'warn' | 'primary' | 'accent' | 'text' = 'primary';

  @Input()
  backgroundColor: 'warn' | 'primary' | 'accent' | 'text' | 'background' = 'background';

  @Input()
  color: 'warn' | 'primary' | 'accent' | 'text' = 'text';

  @HostBinding('style.color') get textColorStyle() {
    return this.themeService.getColor(this.color);
  }

  @HostBinding('style.borderColor') get borderColorStyle() {
    return this.themeService.getColor(this.borderColor);
  }

  @HostBinding('style.background') get backgroundColorStyle() {
    return this.themeService.getColor(this.backgroundColor);
  }

  constructor(public themeService: ThemeService) { }

}

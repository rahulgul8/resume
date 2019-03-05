import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { themes } from '../constants/themes';
import { Theme } from '../constants/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }


  currentThemeSubject: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(themes[0])

  get theme() {
    return this.currentThemeSubject.value;
  }

  set theme(theme: Theme) {
    this.currentThemeSubject.next(theme);
  }

  getColor(color: string) {
    switch (color) {
      case 'warn': return this.theme.warnColor; break;
      case 'primary': return this.theme.primaryColor; break;
      case 'accent': return this.theme.accentColor; break;
      case 'text': return this.theme.textColor; break;
      default: return this.theme.primaryColor; break;
    }
  }
}

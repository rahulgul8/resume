import { Component } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { themes } from './constants/themes';
import { Theme } from './constants/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resume';

  themes = themes;

  editable: boolean = true;

  constructor(private themeService: ThemeService) { }

  get activeTheme() {
    return this.themeService.theme;
  }


  changeThemeTo(selectedTheme: Theme) {
    this.themeService.theme = selectedTheme;
  }


}

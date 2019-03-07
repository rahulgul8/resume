import { Component, ViewContainerRef, ViewChild } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { themes } from './constants/themes';
import { Theme } from './constants/theme';
import { PopoverService } from './services/popover.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resume';

  themes = themes;

  editable: boolean = true;

  constructor(private themeService: ThemeService, private popup: PopoverService) { }

  get activeTheme() {
    return this.themeService.theme;
  }

  @ViewChild("dialogContainer", { read: ViewContainerRef })
  container: ViewContainerRef;

  changeThemeTo(selectedTheme: Theme) {
    this.themeService.theme = selectedTheme;
  }


  element;

  showPopup() {
    if (!this.element)
      this.element = this.popup.show(this.container);
    else {
      this.popup.close(this.element);
      this.element = undefined;
    }
  }




}

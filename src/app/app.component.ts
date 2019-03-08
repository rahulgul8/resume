import { Component, ViewContainerRef, ViewChild, TemplateRef, ContentChildren } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { themes } from './constants/themes';
import { Theme } from './constants/theme';
import { PopoverService } from './services/popover.service';
import { TemplateComponent } from './components/template/template.component';

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


  tabs = [];

  @ContentChildren(TemplateComponent) tab;

  element;

  showPopup() {
    this.tabs.push(this.tab);
  }




}

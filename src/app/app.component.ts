import { Component, ViewContainerRef, ViewChild, TemplateRef, ContentChildren, ViewChildren, OnInit, ComponentRef, QueryList, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { themes } from './constants/themes';
import { Theme } from './constants/theme';
import { PopoverService } from './services/popover.service';
import { TemplateComponent } from './components/template/template.component';
import { ElementComponent } from './components/element/element.component';
import { BulletElementComponent } from './components/bullet-element/bullet-element.component';
import { DomService } from './services/dom.service';
import { ShadowComponent } from './components/shadow/shadow.component';
import { PaperComponent } from './components/paper/paper.component';
import { FormatterDirective } from './directives/formatter.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'resume';

  themes = themes;

  editable: boolean = true;

  constructor(private cdr: ChangeDetectorRef, private themeService: ThemeService, private popup: PopoverService, private dom: DomService) { }

  get activeTheme() {
    return this.themeService.theme;
  }

  @ViewChild("dialogContainer", { read: ViewContainerRef })
  container: ViewContainerRef;

  @ViewChild(PaperComponent)
  paper: PaperComponent;

  changeThemeTo(selectedTheme: Theme) {
    this.themeService.theme = selectedTheme;
  }


  @ViewChildren(ElementComponent) elements: QueryList<ElementComponent>;

  @ViewChildren(BulletElementComponent) bullets: QueryList<BulletElementComponent>;

  @ViewChildren(FormatterDirective) all: QueryList<FormatterDirective>;

  tabs = [];

  @ViewChild('template') tab: TemplateRef<any>;

  element;

  showPopup() {
    this.tabs.push(this.tab);
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.all.forEach((element) => {
    //     let shadow: ComponentRef<ShadowComponent> = this.dom.appendChild(this.paper.viewContainer, ShadowComponent, 'shadowElement', element.element.element.nativeElement);
    //     element.element.shadowElement = shadow.instance;
    //   });

    // });

  }




}



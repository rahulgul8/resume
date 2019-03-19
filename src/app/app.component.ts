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
export class AppComponent implements OnInit, AfterViewInit {

  ngAfterViewInit(): void {
    this.dataList;
    this.bulletTemplate;
    this.headingTemplate;
    this.dataList[0] = new Object();
    this.dataList[0].value = "1st value";
    this.dataList[0].placeholder = "1st value";
    this.dataList[0].focus = true;

    this.dataList[0].bullets = new Array();
    this.dataList[0].bullets[0] = new Object();
    this.dataList[0].bullets[0].placeholder = "bullet 1";
    this.dataList[0].bullets[0].template = this.bulletTemplate;
    this.dataList[0].bullets[1] = new Object();
    this.dataList[0].bullets[1].placeholder = "bullet 2";
    this.dataList[0].dialog = new Object();
    this.dataList[0].dialog.value = "";
    this.dataList[0].dialog.placeholder = "dialog";
    this.dataList[0].dialog.hideIfEmpty = false;
    this.dataList[0].artist = new Object();
    this.dataList[0].artist.value = "";
    this.dataList[0].artist.placeholder = "dialog";
    this.dataList[0].template = this.dialogTemplate;
    this.dataList[0].artist.hideIfEmpty = false;
  }


  print() {
    console.log(this.dataList)
  }


  title = 'resume';

  themes = themes;

  editable: boolean = true;

  constructor(private cdr: ChangeDetectorRef, private themeService: ThemeService, private popup: PopoverService, private dom: DomService) { }

  get activeTheme() {
    return this.themeService.theme;
  }


  changeThemeTo(selectedTheme: Theme) {
    this.themeService.theme = selectedTheme;
  }

  @ViewChildren(TemplateRef) templates: QueryList<TemplateRef<any>>;
  @ViewChild('bullet') bulletTemplate: TemplateRef<any>;
  @ViewChild('heading') headingTemplate: TemplateRef<any>;
  @ViewChild('dialog') dialogTemplate: TemplateRef<any>;

  ngOnInit(): void {

  }
  dataList = [];

  printInfo() {
    var openWindow = window.open("", "title", "attributes");
    var html = '<html><head>' +
      document.getElementsByTagName('head')[0].innerHTML +
      '</head><body><div>' +
      document.getElementById("paper").innerHTML +
      '</div></body></html>';
    openWindow.document.write(html);
    openWindow.document.close();
    openWindow.focus();
    openWindow.print();
    // openWindow.close();
  }
}



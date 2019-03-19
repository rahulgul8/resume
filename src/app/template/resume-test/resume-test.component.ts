import { Component, OnInit, ChangeDetectorRef, ViewChildren, TemplateRef, QueryList, ViewChild } from '@angular/core';
import { themes } from 'src/app/constants/themes';
import { ThemeService } from 'src/app/services/theme.service';
import { PopoverService } from 'src/app/services/popover.service';
import { DomService } from 'src/app/services/dom.service';
import { Theme } from 'src/app/constants/theme';

@Component({
  selector: 'app-resume-test',
  templateUrl: './resume-test.component.html',
  styleUrls: ['./resume-test.component.css']
})
export class ResumeTestComponent implements OnInit {


  ngAfterViewInit(): void {
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
    this.dataList[0] = new Object();
    this.dataList[0].value = "1st value";
    this.dataList[0].placeholder = "1st value";
    this.dataList[0].focus = true;
    this.dataList[0].popover = true;

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
    this.dataList[0].template = this.headingTemplate;
    this.dataList[0].artist.hideIfEmpty = false;
  }
  dataList = [];

}

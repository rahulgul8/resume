import { Component, OnInit, Input, OnChanges, HostBinding } from '@angular/core';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { ParentElement } from '../parent-element';
import { ThemeService } from 'src/app/services/theme.service';



@Component({
  selector: 'bullet-element',
  templateUrl: './bullet-element.component.html',
  styleUrls: ['./bullet-element.component.css']
})
export class BulletElementComponent extends ParentElement implements OnInit {

  @Input()
  bulletColor: 'warn' | 'primary' | 'accent' | 'text' = 'primary';

  constructor(public themeService: ThemeService) {
    super(themeService);
  }

  ngOnInit() {
  }

  @HostBinding('style.color') get textColorStyle() {
    return this.themeService.getColor(this.bulletColor);
  }

}

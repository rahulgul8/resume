import { Component, OnInit, Input, OnChanges, HostBinding, ChangeDetectorRef, Optional, ElementRef } from '@angular/core';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { ParentElement } from '../parent-element';
import { ThemeService } from 'src/app/services/theme.service';
import { DisabledDirective } from 'src/app/directives/disabled.directive';



@Component({
  selector: 'bullet-element',
  templateUrl: './bullet-element.component.html',
  styleUrls: ['./bullet-element.component.css']
})
export class BulletElementComponent extends ParentElement implements OnInit {

  @Input()
  bulletColor: 'warn' | 'primary' | 'accent' | 'text' = 'primary';

  constructor(element: ElementRef, public themeService: ThemeService, changeDetector: ChangeDetectorRef, @Optional() optDisabled: DisabledDirective) {
    super(element, themeService, changeDetector, optDisabled);
    this.leftoffset = 20;
  }

  ngOnInit() {

  }

  @Input()
  bullets = [];

  @HostBinding('style.color') get textColorStyle() {
    return this.themeService.getColor(this.bulletColor);
  }

}

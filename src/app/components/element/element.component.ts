import { Component, OnInit, Input, HostBinding, ElementRef, ViewChild, OnChanges, SimpleChanges, AfterViewInit, ViewChildren, ChangeDetectorRef, Optional } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { ParentElement } from '../parent-element';
import { TooltipDirective } from 'src/app/modules/tooltip/tooltip.directive';
import { DisabledDirective, resolve } from 'src/app/directives/disabled.directive';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent extends ParentElement implements OnInit, OnChanges {

  @ViewChild('divTag') divTag: ElementRef; // DOM element

  constructor(public themeService: ThemeService, changeDetector: ChangeDetectorRef, @Optional() optDisabled: DisabledDirective) {
    super(themeService, changeDetector, optDisabled);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  click() {
    setTimeout(_ => this.divTag.nativeElement.focus(), 0);
  }

}

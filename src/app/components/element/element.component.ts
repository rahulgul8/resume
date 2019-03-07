import { Component, OnInit, Input, HostBinding, ElementRef, ViewChild, OnChanges, SimpleChanges, AfterViewInit, ViewChildren } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { ParentElement } from '../parent-element';
import { TooltipDirective } from 'src/app/modules/tooltip/tooltip.directive';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.scss']
})
export class ElementComponent extends ParentElement implements OnInit, OnChanges {

  hidden: boolean = false;

  @ViewChild('divTag') divTag: ElementRef; // DOM element

  constructor(public themeService: ThemeService) {
    super(themeService);
  }

  someTooltip: any;

  @ViewChildren(TooltipDirective) tooltipDirective;

  ngAfterViewInit() {
    this.someTooltip = this.tooltipDirective.first;
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editable'] && !changes['editable'].currentValue && this.isHideIfEmpty && !this.value) {
      this.hidden = true;

    } else {
      this.hidden = false;
    }


    if (this.editable && this.someTooltip) {
      this.someTooltip.show();
    }
    else if (this.someTooltip) {
      this.someTooltip.hide(true);
    }
  }

  click() {
    setTimeout(_ => this.divTag.nativeElement.focus(), 0);
  }
}

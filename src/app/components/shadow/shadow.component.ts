import { Component, OnInit, ElementRef, HostBinding, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-shadow',
  templateUrl: './shadow.component.html',
  styleUrls: ['./shadow.component.css']
})
export class ShadowComponent implements OnInit {

  shadowElement: HTMLElement;

  constructor(public element: ElementRef, public changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {
    
  }

  // @HostBinding('style.width') hostStyleWidth: string;
  // @HostBinding('style.height') hostStyleHeight: string;

  calculate() {
    // this.hostStyleTop = "100px";
    // this.hostStyleLeft = "100px";
  }

  protected leftoffset: number = 0;

  protected topoffset: number = 0;

  // @HostBinding('style.width')
  // get width(): string {
  //   if (this.shadowElement) {
  //     return this.shadowElement.offsetWidth + "px";
  //   }
  //   return "0";

  // }

  @HostBinding('style.height')
  @HostBinding('style.minHeight')
  get height(): string {
    if (this.shadowElement) {
      return this.shadowElement.offsetHeight + "px";
    }
    return "0";
  }
}

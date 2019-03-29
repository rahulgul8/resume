import { Component, OnInit, HostBinding, HostListener } from '@angular/core';

@Component({
  selector: 'app-pagenumber',
  templateUrl: './pagenumber.component.html',
  styleUrls: ['./pagenumber.component.css']
})
export class PagenumberComponent implements OnInit {

  @HostBinding('style.top') hostStyleTop: string;
  @HostBinding('style.left') hostStyleLeft: string;

  data;

  get pagenumber() {
    return this.data.pagenumber;
  }

  get offset() {
    return this.data.offset;
  }

  get element() {
    return this.data.element;
  }

  get elementPosition() {
    return this.data.element.getBoundingClientRect();
  }

  constructor() { }

  ngOnInit() {
    this.reposition();
  }

  reposition() {
    const isSvg = this.element instanceof SVGElement;
    const scrollY = window.pageYOffset;
    const elementWidth = isSvg ? this.element.getBBox().width : this.element.offsetWidth;
    this.hostStyleTop = this.elementPosition.top + scrollY + this.pagenumber * this.offset + 'px';
    this.hostStyleLeft = this.elementPosition.left + elementWidth + 'px';
  }

  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.reposition();
  }
}

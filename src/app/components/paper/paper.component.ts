import { Component, OnInit, ViewContainerRef, ElementRef, HostBinding, DoCheck } from '@angular/core';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit, DoCheck {

  ngDoCheck(): void {
    if (this.isOverflown()) {
      console.log('Height scroll ' + this.element.nativeElement.scrollHeight);
      console.log('Height client ' + this.element.nativeElement.clientHeight);
    }
  }

  constructor(public viewContainer: ViewContainerRef, private element: ElementRef) { }

  ngOnInit() {
  }

  isOverflown() {
    return this.element.nativeElement.scrollHeight > this.element.nativeElement.clientHeight
      || this.element.nativeElement.scrollWidth > this.element.nativeElement.clientWidth;
  }

}

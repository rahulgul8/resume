import { Component, OnInit, ViewContainerRef, ElementRef, HostBinding } from '@angular/core';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit {

  constructor(public viewContainer: ViewContainerRef, private element: ElementRef) { }

  ngOnInit() {
    // from(this.element.nativeElement.scrollHeight).subscribe((e) => console.log('scroll ' + e));
    // from(this.element.nativeElement.clientHeight).subscribe((e) => console.log('client ' + e));
  }

  isOverflown() {
    return this.element.nativeElement.scrollHeight > this.element.nativeElement.clientHeight
      || this.element.nativeElement.scrollWidth > this.element.nativeElement.clientWidth;
  }

  @HostBinding('style.scrollHeight') get scrollHeight() {

    if (this.isOverflown()) {
      console.log('Height scroll ' + this.element.nativeElement.scrollHeight);
      console.log('Height client ' + this.element.nativeElement.clientHeight);
    }
    return this.element.nativeElement.scrollHeight;
  }
}

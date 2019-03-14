import { Component, OnInit, ElementRef, Renderer, forwardRef, ViewChild, Input, Renderer2, HostBinding } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { timer } from 'rxjs';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextElementComponent),
  multi: true
};

@Component({
  selector: 'text-element',
  templateUrl: './text-element.component.html',
  providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
  styleUrls: ['./text-element.component.css']
})
export class TextElementComponent implements OnInit {
  ngOnInit(): void {

  }

  lefti = "";

  topi = "";


  @HostBinding('style.left')
  get left(): string {
    return this.lefti;

  }

  @HostBinding('style.top')
  get top(): string {
    return this.topi;
  }

  constructor(private element: ElementRef) {
    timer(100, 1000).subscribe((e) => {
      this.lefti = e + "px";
      this.topi = e + "px";
    });
  }


}

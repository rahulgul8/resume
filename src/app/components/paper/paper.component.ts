import { Component, OnInit, ViewContainerRef, ElementRef, HostBinding, DoCheck, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit, DoCheck {


  @Output() paperFull = new EventEmitter<any>(true);

  @Output() hasSpace = new EventEmitter<any>(true);


  @Input() index;

  @Input() lastIndex;



  @Input()
  dataList = [];

  @Input()
  templates = [];

  ngDoCheck(): void {
    if (this.isOverflown()) {
      this.updatePaperOnOverflow(this.dataList.length - 1);
    } else {
      // this.updatePaperOnUnderFlow();
    }
  }

  templateEvent(event) {
    if (this.isOverflown()) {
      this.updatePaperOnOverflow(event.index);
    } else {
      this.updatePaperOnUnderFlow();
    }
  }



  updatePaperOnOverflow(index) {
    this.paperFull.emit({ index: this.index, data: this.dataList.splice(index, 1) });
  }


  updatePaperOnUnderFlow() {
    let gap = this.getEmptySpace(this.element.nativeElement, this.element.nativeElement.children.item(0));
    if (gap > 63 && this.index != this.lastIndex) { this.hasSpace.emit({ index: this.index, gap: gap }); }
  }

  slicePaper(count) {
    return this.dataList.splice(0, count);
  }
  constructor(public viewContainer: ViewContainerRef, private element: ElementRef) { }

  ngOnInit() {
  }

  public isOverflown() {
    return this.element.nativeElement.scrollHeight > this.element.nativeElement.clientHeight;
  }

  public getHeightGap() {
    return this.element.nativeElement.scrollHeight - this.element.nativeElement.clientHeight;
  }

  public getElementsForSpace(space: number) {
    let childrenTotalHeight = 0;
    let template = this.element.nativeElement.children.item(0);
    let i = 0;
    for (; i < template.childElementCount; i++) {
      childrenTotalHeight = childrenTotalHeight + template.children.item(i).clientHeight;
      if (childrenTotalHeight > space && i != 0) {
        return this.slicePaper(i - 1);
      }
    }
    if (childrenTotalHeight <= space && i != 0) {
      return this.slicePaper(i);
    }
  }

  public getEmptySpace(paper: HTMLElement, template: HTMLElement) {
    let childrenTotalHeight = 0;
    for (let i = 0; i < template.childElementCount; i++) {
      childrenTotalHeight = childrenTotalHeight + template.children.item(i).clientHeight;
    }
    return paper.clientHeight - childrenTotalHeight;
  }

}

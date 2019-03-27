import { Component, OnInit, ViewContainerRef, ElementRef, HostBinding, DoCheck, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.css']
})
export class PaperComponent implements OnInit, DoCheck, OnDestroy {



  @Output() paperFull = new EventEmitter<any>(true);

  @Output() hasSpace = new EventEmitter<any>(true);


  @Input() index;

  @Input() lastIndex;



  @Input()
  dataList = [];

  @Input()
  templates = [];

  ngDoCheck(): void {
  }

  checkPaperFlow(event) {
    if (this.element.nativeElement.contains(event.nativeElement)) {
      if (this.isOverflown()) {
        this.updatePaperOnOverflow(this.dataList.length - 1);
      } else {
        this.updatePaperOnUnderFlow();
      }
    }
  }

  templateEvent(event) {
    if (this.isOverflown()) {
      this.paperFull.emit({ index: this.index, data: this.getOverFlowingElements() });
    } else {
      this.updatePaperOnUnderFlow();
    }
  }

  getOverFlowingElements() {
    let bound = this.element.nativeElement.getBoundingClientRect();
    debugger;
    let template = this.element.nativeElement.children.item(0);
    let i = template.childElementCount - 1;
    for (; i >= 0; i--) {
      if (template.children.item(i).getBoundingClientRect().bottom < bound.bottom) {
        return this.dataList.splice(i, this.dataList.length - i);
      }
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
  constructor(private eventService: EventsService, public viewContainer: ViewContainerRef, private element: ElementRef) { }

  lineWrapListener;

  ngOnInit() {
    this.lineWrapListener = this.eventService.on('linewrap', (event) => this.checkPaperFlow(event));
  }

  ngOnDestroy(): void {
    this.eventService.off('linewrap', this.lineWrapListener);
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

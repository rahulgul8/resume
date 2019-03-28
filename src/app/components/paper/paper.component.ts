import { Component, OnInit, ViewContainerRef, ElementRef, HostBinding, DoCheck, Output, EventEmitter, Input, OnDestroy, IterableDiffers, IterableDiffer } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { TemplateEvent, LineWrapEvent, UserEvents } from 'src/app/constants/events';

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

  iterableDiffer: IterableDiffer<any>;

  lineWrapListener;

  constructor(_iterableDiffers: IterableDiffers, private eventService: EventsService, public viewContainer: ViewContainerRef, private element: ElementRef) {
    this.iterableDiffer = _iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    this.lineWrapListener = this.eventService.on('linewrap', (event: LineWrapEvent) => {
      if (this.element.nativeElement.contains(event.source)) {
        this.onEvent(event.name);
      }
    });
  }

  ngOnDestroy(): void {
    this.eventService.off('linewrap', this.lineWrapListener);
  }

  ngDoCheck(): void {
    let changes = this.iterableDiffer.diff(this.dataList);
    if (changes) {
      let added = 0;
      let removed = 0;
      changes.forEachAddedItem(() => added++);
      changes.forEachRemovedItem(() => removed++);

      if (added > 0) {
        setTimeout(() => {
          this.onPaperOverFlow();
        });
      } else if (removed > 0) {
        setTimeout(() => {
          this.onPaperUnderFlow();
        });
      }
    }
  }


  onPaperOverFlow() {
    if (this.isOverflown()) {
      this.paperFull.emit({ index: this.index, data: this.getOverFlowingElements() });
    }
  }


  onEvent(eventName: UserEvents) {
    switch (eventName) {
      case UserEvents.add: this.onPaperOverFlow(); break;
      case UserEvents.delete: this.onPaperUnderFlow(); break;
    }
  }


  templateEvent(event: TemplateEvent) {
    // this.onEvent(event.popevent.name);
  }

  getOverFlowingElements() {
    let bound = this.element.nativeElement.getBoundingClientRect();
    let template = this.element.nativeElement.children.item(0);
    let i = template.childElementCount - 1;
    let result = [];
    for (; i >= 0; i--) {
      let childRect = template.children.item(i).getBoundingClientRect();
      if (childRect.bottom < bound.bottom) {
        return this.dataList.splice(i + 1, this.dataList.length - i);
      }
    }
  }


  /**
   * Checks if the paper has empty space
   * and if its not the last paper, then emits the hasSpace event
   * which can be processed by the Paperstemplate component. 
   */
  onPaperUnderFlow() {
    let gap = this.getEmptySpace();
    if (gap > 60) { this.hasSpace.emit({ index: this.index, gap: gap }); }
  }

  /**
   * removes the elements from the start of the paper. 
   * @param count number of elements to remove
   */
  slicePaper(count) {
    return this.dataList.splice(0, count);
  }


  /**
   * Returns if this element is overflowing.
   */
  public isOverflown() {
    return this.element.nativeElement.scrollHeight > this.element.nativeElement.clientHeight;
  }

  /**
   * Returns the amount of freespace available in this paper. 
   */
  public getHeightGap() {
    return this.element.nativeElement.scrollHeight - this.element.nativeElement.clientHeight;
  }

  /**
   * For the given space, finds how many elements in this paper can be accomodated, 
   *  
   * Checks from the start of the paper. Used to move the components to the previous page
   * when space is available in the previous page. 
   * 
   * @param space amount of space available in the previous page. 
   */
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

  /**
   * returns the amount of empty space available in this paper. 
   * @param paper current paper
   * @param template the @type TemplateComponent in this paper. 
   */
  public getEmptySpace() {
    let paper = this.element.nativeElement;
    let template = this.element.nativeElement.children.item(0)
    let childrenTotalHeight = 0;
    for (let i = 0; i < template.childElementCount; i++) {
      childrenTotalHeight = childrenTotalHeight + template.children.item(i).clientHeight;
    }
    return paper.clientHeight - childrenTotalHeight;
  }

}

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

  checkPaperFlows() {
    if (this.isOverflown()) {
      this.paperFull.emit({ index: this.index, data: this.getOverFlowingElements() });
    } else {
      this.updatePaperOnUnderFlow();
    }
  }

  templateEvent(event) {
    this.checkPaperFlows();
  }

  getOverFlowingElements() {
    let bound = this.element.nativeElement.getBoundingClientRect();
    let template = this.element.nativeElement.children.item(0);
    let i = template.childElementCount - 1;
    let result = [];
    for (; i >= 0; i--) {
      let childRect = template.children.item(i).getBoundingClientRect();
      if (childRect.bottom > bound.bottom) {
        result.push(...this.dataList.splice(i, 1));
      } else {
        return result;
      }
    }
  }


  /**
   * Checks if the paper has empty space
   * and if its not the last paper, then emits the hasSpace event
   * which can be processed by the Paperstemplate component. 
   */
  updatePaperOnUnderFlow() {
    let gap = this.getEmptySpace(this.element.nativeElement, this.element.nativeElement.children.item(0));
    if (this.index != this.lastIndex) { this.hasSpace.emit({ index: this.index, gap: gap }); }
  }

  /**
   * removes the elements from the start of the paper. 
   * @param count number of elements to remove
   */
  slicePaper(count) {
    return this.dataList.splice(0, count);
  }
  constructor(private eventService: EventsService, public viewContainer: ViewContainerRef, private element: ElementRef) { }

  lineWrapListener;

  ngOnInit() {
    this.lineWrapListener = this.eventService.on('linewrap', (event) => {
      if (this.element.nativeElement.contains(event.nativeElement)) {
        this.checkPaperFlows()
      }
    });
  }

  ngOnDestroy(): void {
    this.eventService.off('linewrap', this.lineWrapListener);
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
  public getEmptySpace(paper: HTMLElement, template: HTMLElement) {
    let childrenTotalHeight = 0;
    for (let i = 0; i < template.childElementCount; i++) {
      childrenTotalHeight = childrenTotalHeight + template.children.item(i).clientHeight;
    }
    return paper.clientHeight - childrenTotalHeight;
  }

}

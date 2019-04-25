import { Component, OnInit, Input, ViewChildren, QueryList, ElementRef, ViewChild } from '@angular/core';
import { PaperComponent } from '../paper/paper.component';
import { clone, cloneForTemplating, cloneArrayForTemplating } from 'src/app/constants/data';
import { DomService } from 'src/app/services/dom.service';

@Component({
  selector: 'paperstemplate',
  templateUrl: './paperstemplate.component.html',
  styleUrls: ['./paperstemplate.component.css']
})
export class PaperstemplateComponent implements OnInit {


  @Input()
  dataList = [];

  paperHeight = 1163;

  /**
   * List of templates that are used in this paperstemplate. 
   * 
   * You have to build it in the calling place.
   */
  @Input()
  templates = [];

  @Input()
  initialData = [];

  @Input()
  tools = [];

  @Input()
  useLongPaper: boolean = false;

  constructor(private dom: DomService, private element: ElementRef) { }

  /**
   * The Initial data that is provided in the template from where paperstemplate is called through code.
   * This Initial data is added to every new paper created. Its used give the popups, the template names and the template data. 
   * 
   * If you don't add this initial data to the next page, it will have only the popup option with the template 
   * of the first element, that is added to that paper. When you add this initial data, all the templates are passed to it as hidden element.
   * 
   * Filtered based on the cloned attribute which is set in the template element's add event. 
   * 
   * If an element is added by the user action(not through code) then its cloned attribute would be true. 
   * Hence, by filtering through cloned attribute, the template data that is passed by the template component is filtered.
   */
  ngOnInit() {
    if (this.initialData.length == 0) {
      this.initialData = this.dataList[0].filter(d => !d.cloned).map(d => clone(d));
      this.initialData.forEach(d => d.hide = true);
    }
    this.tools.push({ icon: 'note_add', action: 'addPaper' });
    this.tools.push({ icon: 'delete', action: 'deletePaper' });
  }

  @ViewChildren(PaperComponent)
  papers: QueryList<PaperComponent>;

  /**
   * Handles the page full event triggered from the papers. 
   * @param event contains the index of the paper, the elements that need to be moved to the next paper
   */
  handleFull(event) {
    if (event.data && event.data.length > 0) {
      if (this.dataList.length > event.index + 1) {
        this.dataList[event.index + 1].unshift(...event.data);
      }
      else {
        event.data.push(...this.initialData);
        this.dataList.push(event.data);
      }
    }
  }

  /**
   * Handles the space available event from paper. 
   * If a paper decides that it has some space available to other components, 
   * it notifies with an event. 
   * 
   * @param event contains the index of the paper and the gap that is available in the paper. 
   */
  handleSpace(event) {
    let papersArray = this.papers.toArray();
    let prevPaperIndex = event.index == 0 ? event.index : event.index - 1;

    for (let currentPaperIndex = prevPaperIndex; currentPaperIndex < this.dataList.length - 1; currentPaperIndex++) {
      let currentPaper = papersArray[currentPaperIndex];
      let nextPaper = papersArray[currentPaperIndex + 1];
      let elementsFromBelowPage: Array<any> = nextPaper.getElementsForSpace(currentPaper.getEmptySpace());
      this.dataList[currentPaperIndex].push(...elementsFromBelowPage);
      if (nextPaper.dataList.length == 0) {
        this.dataList.splice(currentPaperIndex + 1, 1);
      }
    }
  }


  addTemplateToEnd(event, index) {
    switch (event.action) {
      case 'addPaper': this.addNewPaper(event, index); break;
      case 'deletePaper': this.deletePaper(event, index); break;
      default:
        let data = this.dataList[index];
        if (data && data.length) {
          data.push(...this.initialData.filter(d => d.template == event.action).map(d => cloneForTemplating(d)));
        }; break;
    }
  }

  deletePaper(event, index) {
    this.dataList.splice(index, 1);
  }

  addNewPaper(event, index) {
    if (event.data) {
      this.dataList.push(event.data.map(d => cloneForTemplating(d)));
    } else {
      this.dataList.push(this.initialData.map(d => cloneForTemplating(d)));
    }
  }

  @ViewChild(PaperComponent) paper: PaperComponent;

  getTools(index) {
    if (index == 0) {
      return this.tools.filter(t => t.icon != 'delete')
    }
    return this.tools;
  }

  print() {
    console.log(this.dom.gethtmlForComponent(this.paper.element.nativeElement));
  }
}

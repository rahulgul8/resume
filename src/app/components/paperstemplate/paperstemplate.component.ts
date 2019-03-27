import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { PaperComponent } from '../paper/paper.component';

@Component({
  selector: 'paperstemplate',
  templateUrl: './paperstemplate.component.html',
  styleUrls: ['./paperstemplate.component.css']
})
export class PaperstemplateComponent implements OnInit {


  @Input()
  dataList = [];

  @Input()
  templates = [];

  constructor() { }

  ngOnInit() {
    console.log(this.dataList);
  }

  @ViewChildren(PaperComponent)
  papers: QueryList<PaperComponent>;

  handleFull(event) {
    if (this.dataList.length > event.index + 1) {
      this.dataList[event.index + 1].unshift(...event.data);
    }
    else { this.dataList.push(event.data); }
  }

  handleSpace(event) {
    let papersArray = this.papers.toArray();
    let nextPaperIndex = event.index + 1;
    let nextPaper = papersArray[nextPaperIndex];
    console.log(event);
    let elementsFromBelowPage: Array<any> = nextPaper.getElementsForSpace(event.gap);
    this.dataList[event.index].push(...elementsFromBelowPage);
    if (nextPaper.dataList.length == 0) {
      this.dataList.splice(nextPaperIndex, 1);
    }
  }
}

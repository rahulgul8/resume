import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { PaperComponent } from '../paper/paper.component';
import { clone } from 'src/app/constants/data';

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

  @Input()
  initialData = [];

  constructor() { }

  ngOnInit() {
    console.log(this.dataList);
    this.initialData = this.dataList[0].filter(d => !d.cloned).map(d => clone(d));
    this.initialData.forEach(d => d.hide = true);
  }

  @ViewChildren(PaperComponent)
  papers: QueryList<PaperComponent>;

  handleFull(event) {
    if (this.dataList.length > event.index + 1) {
      this.dataList[event.index + 1].unshift(...event.data);
    }
    else {
      event.data.push(...this.initialData);
      this.dataList.push(event.data);
    }
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

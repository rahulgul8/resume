import { Component, OnInit, ViewChild } from '@angular/core';
import { getData } from 'src/app/constants/data';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.css']
})
export class SceneComponent implements OnInit {

  constructor() { }

  @ViewChild('sceneHeader') sceneHeader;

  @ViewChild('dialog') dialogTemplate;

  dataList = [];

  ngOnInit() {
    let header = this.getSceneHeaderData();
    let dialog = this.getDialogData();
    dialog.artists = header.chips;
    this.dataList.push(header);
    this.dataList.push(dialog);

  }

  getDialogData() {
    let data: any = new Object();
    data.template = this.dialogTemplate;
    data.popover = true;
    data.focus = false;
    data.dialog = {};
    // data.artists = this.getChips('artist', 3);
    data.dialog.placeholder = "Dialogue";
    return data;
  }


  print() {
    console.log(this.dataList);
  }
  getSceneHeaderData() {
    let data: any = new Object();
    data.placeholder = "Scene title";
    data.value = "Title";
    data.focus = true;
    data.hideIfEmpty = false;
    data.template = this.sceneHeader;
    data.popover = false;
    data.chips = this.getChips('name', 3);
    data.subtitle = {};
    data.subtitle.placeholder = "Scene sub title";
    data.toggle = this.getDayNight();
    return data;
  }

  getChips(placeholder, count) {
    let chips = [];
    for (let i = 0; i < count; i++) {
      chips.push(getData(placeholder, false, 'Chip'));
    }
    return chips;
  }

  getDayNight() {
    return [getData('day', false, 'Day'), getData('day', false, 'Night')];
  }

}

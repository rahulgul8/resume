import { Component, OnInit, ViewChild } from '@angular/core';

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
    this.dataList.push(this.getSceneHeaderData());
    this.dataList.push(this.getDialogData());

  }

  getDialogData() {
    let data: any = new Object();
    data.template = this.dialogTemplate;
    data.popover = true;
    data.focus = false;
    data.artist = {};
    data.dialog = {};
    data.artist.placeholder = "Artist";
    data.dialog.placeholder = "Dialogue";
    return data;
  }


  print() {
    console.log(this.dataList);
  }
  getSceneHeaderData() {
    let data: any = new Object();
    data.placeholder = "Scene title";
    data.value = "";
    data.focus = true;
    data.hideIfEmpty = false;
    data.template = this.sceneHeader;
    data.popover = false;
    data.chips = this.getChips();
    data.subtitle = {};
    data.subtitle.placeholder = "Scene sub title";
    return data;
  }

  getChips() {
    let chips = [];
    for (let i = 0; i < 3; i++) {
      let chip: any = new Object();
      chip = new Object();
      chip.value = "";
      chip.placeholder = "artist";
      chip.hideIfEmpty = false;
      chips.push(chip);
    }
    return chips;
  }

}

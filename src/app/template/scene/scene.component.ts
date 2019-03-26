import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
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

  @ViewChild('description') descriptionTemplate;

  data = [];

  templates = [];

  ngOnInit() {
    this.templates = [{ name: 'dialog', template: this.dialogTemplate },
    { name: 'description', template: this.descriptionTemplate },
    { name: 'sceneHeader', template: this.sceneHeader }]
    let header = this.getSceneHeaderData();
    let dialog = this.getDialogData();
    dialog.artists = header.chips;
    this.data.push(header);
    this.data.push(dialog);
    this.data.push(this.getDescriptionData());
  }

  getDialogData() {
    let data: any = new Object();
    data.template = 'dialog';
    data.popover = true;
    data.focus = false;
    data.dialog = {};
    // data.artists = this.getChips('artist', 3);
    data.dialog.placeholder = "Dialogue";
    return data;
  }

  getDescriptionData() {
    let data: any = new Object();
    data.template = 'description';
    data.popover = true;
    data.focus = false;
    data.dialog = {};
    // data.artists = this.getChips('artist', 3);
    data.dialog.placeholder = "Description";
    return data;
  }

  print() {
    this.templates.forEach((t) => console.log(t));
    console.log(this.data);
  }

  getSceneHeaderData() {
    let data: any = new Object();
    data.placeholder = "Scene title";
    data.value = "Title";
    data.focus = true;
    data.hideIfEmpty = false;
    data.template = 'sceneHeader';
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

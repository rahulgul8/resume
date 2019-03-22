import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor() { }


  @Input()
  data;

  @Input()
  borderColor: 'warn' | 'primary' | 'accent' | 'text' = 'primary';

  @Input()
  backgroundColor: 'warn' | 'primary' | 'accent' | 'text' | 'background' = 'background';

  ngOnInit() {
  }

}

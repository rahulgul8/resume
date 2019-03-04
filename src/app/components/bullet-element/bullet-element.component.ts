import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';
import { Theme } from 'src/app/constants/theme';
import { themes } from 'src/app/constants/themes';


@Component({
  selector: 'bullet-element',
  templateUrl: './bullet-element.component.html',
  styleUrls: ['./bullet-element.component.css']
})
export class BulletElementComponent implements OnInit {

  @Input()
  bullet: string = "disc";

  themes = themes;

  constructor(private themeService: ThemeService) { }

  get activeTheme(){
    return this.themeService.theme;
  }

  changeThemeTo(selectedTheme: Theme){
    this.themeService.theme = selectedTheme;
  }


  ngOnInit() {
  }

}

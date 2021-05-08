import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {
  title = "HeiseMinus";
  
  constructor() { }

  ngOnInit(): void {
  }

}

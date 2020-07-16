import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  filedList: number[] = [0,1,2,3];

  constructor() {
    
   }

  ngOnInit(): void {
  }

  addField() {
    this.filedList.push(this.filedList.length);
    console.log(this.filedList);
  }

  deleteField(item) {
    this.filedList =this.filedList.filter( e => e!== item);
    console.log(this.filedList);
  }
}

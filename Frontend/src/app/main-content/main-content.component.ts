import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  filedList: number[] = [0,1,2,3];
  options: string[] = [
    "Imię", 
    "Nazwisko", 
    "Id", 
    "Email", 
    "Nr telefonu", 
    "Adres", 
    "Miasto", 
    "Państwo",
    "Wiek"
  ];

  constructor(private fileService: FileService, private route: ActivatedRoute, private router: Router) {
    
   }


  ngOnInit(): void {

  }

  addField() {
    this.filedList.push(this.filedList.length);
  }

  deleteField(item) {
    this.filedList =this.filedList.filter( e => e!== item);
  }

  generateFile(nameOne: string, nameTwo: string, nameThree: string, optOne: string, optTwo: string, optThree: string, number: number) {
    let obj = {
      nameOne: nameOne,
      nameTwo: nameTwo,
      nameThree: nameThree,
      optOne: optOne,
      optTwo: optTwo,
      optThree: optThree,
      number: number
    };
    console.log(obj);
    this.fileService.generateFile(obj).subscribe((res: any) => {
      console.log("Tis is jason file" );
      console.log(res);
    });
  }

  
}

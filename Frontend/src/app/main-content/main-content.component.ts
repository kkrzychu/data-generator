import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  valid: boolean = false; 
  show: boolean = false;
  arrayOfFields: any[] = [
    {
      inputField: '',
      selectOption: ''
    },
    {
      inputField: '',
      selectOption: ''
    },
    {
      inputField: '',
      selectOption: ''
    },
    {
      inputField: '',
      selectOption: ''
    }
  ]
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
    this.arrayOfFields.push({
      inputField: '',
      selectOption: ''
    });
    
  }

  deleteField(item) {
    this.arrayOfFields = this.arrayOfFields.filter( e => e!== item);
  }

  generateFile(num) {
    this.validForm();
    if(this.valid) {
      this.show = false;
      let obj = {
        tabOfInputs: this.arrayOfFields,
        numberOfInputs: num
      };
      this.fileService.generateFile(obj).subscribe((res: any) => {
        saveAs(new Blob([JSON.stringify(res)], {type: "text/plain;charset=utf-8"}), "random.json")
      });
    } else {
      this.show = true;
    }
  }

  validForm() {
    this.arrayOfFields.forEach((item) => {
      if(item.inputField == "" || item.selectOption == "") {
        this.valid = false;
      } else {
        this.valid = true;
      }
    })
  }

  
}



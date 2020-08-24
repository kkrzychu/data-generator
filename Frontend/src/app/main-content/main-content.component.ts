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
  content: any = "hehehe";
  optionsCodeMirror: any = {
    value: "#start text",
    lineNumbers: true,
    theme: 'dracula',
    mode: {name: "javascript", json: true},
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter", "CodeMirror-lint-markers"],
    autoCloseBrackets: true,
    matchBrackets: true,
    tabSize: 20
  }
  obj;
  subObject: object[] = [];
  arrayOfFields: any[] = [
    {
      inputField: '',
      selectOption: '',
      firstSubObject: [],
      addedSubObject: false
    },
    {
      inputField: '',
      selectOption: '',
      firstSubObject: [],
      addedSubObject: false
    },
    {
      inputField: '',
      selectOption: '',
      firstSubObject: [],
      addedSubObject: false
    },
    {
      inputField: '',
      selectOption: '',
      firstSubObject: [],
      addedSubObject: false
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
    this.obj= JSON.stringify([{
      "imie": "getRandomName",
      "nazwisko": "object",
      "id": "Object",
      "email": false,
      "telefon": "",
      "adres": "",
      "Miasto": "Warszawa",
      "Panstwo": "",
      "Wiek": "getRandomAge"
    }], null, ' ');
    console.log(this.obj);
  }


  addField() {
    this.arrayOfFields.push({
      inputField: '',
      selectOption: '',
      firstSubObject: [],
      addedSubObject: false
    });
    
  }

  deleteField(item) {
    this.arrayOfFields = this.arrayOfFields.filter( e => e!== item);
    console.log(item);
  }

  deleteSubField(item, num) {
    this.arrayOfFields[num].firstSubObject = this.arrayOfFields[num].firstSubObject.filter( e => e!==item);
    if(this.arrayOfFields[num].firstSubObject.length == 0) {
      this.arrayOfFields[num].addedSubObject = false;
    }
    console.log(num);
  }

  generateFile(num) {
    //this.validForm();
    console.log(this.arrayOfFields);
    if(true) {
      this.show = false;
      let obj = {
        tabOfInputs: this.obj,
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
    
      if(item.addedSubObject == false) {
        if(item.inputField == "" || item.selectOption == "") {
          this.valid = false;
        } else {
          this.valid = true;
        }
      } else {
        item.firstSubObject.forEach((it) => {
          if(item.inputField == "" || it.subInputField == "" || it.subSelectOption == "") {
            this.valid = false;
          } else {
            this.valid = true;
          }
        })
      }
      
      })
  }

  addSubObject(item) {
    item.firstSubObject.push({
      subInputField: '',
      subSelectOption: ''
    });
    item.addedSubObject = true;
    item.inputField = '';
  }

  
  showTest() {
    console.log(this.obj);
  }
}



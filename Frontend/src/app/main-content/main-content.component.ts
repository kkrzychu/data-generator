import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
// 


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  valid: boolean = false; 
  show: boolean = false;
  content: any = "hehehe";
  optionsCodeMirror: object = {
    tabSize: 10,
    lineNumbers: true,
    theme: 'material-ocean',
    mode: {name: "javascript", json: true},
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
      "F11": function(cm) {
        cm.setOption("fullScreen", !cm.getOption("fullScreen"));
      },
      "Esc": function(cm) {
        if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
      }
    }
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

  functionNameTab: any[] = [
    {
      name: 'id',
      head: 'headingOne',
      coll: 'collapseOne',
      desc: 'Funkcja numerująca obiekty'
    },
    {
      name: 'getRandomName',
      head: 'headingTwo',
      coll: 'collapseTwo',
      desc: 'Funkcja generująca losowe imię'
    },
    {
      name: 'getRandomLastName',
      head: 'headingThree',
      coll: 'collapseThree',
      desc: 'Funkcja generująca losowe nazwisko'
    },
    {
      name: 'getRandomEmail',
      head: 'headingFour',
      coll: 'collapseFour',
      desc: 'Funkcja generująca losowy email'
    },
    {
      name: 'getRandomAddress',
      head: 'headingFive',
      coll: 'collapseFive',
      desc: 'Funkcja generująca losowy adres'
    },
    {
      name: 'getRandomCity',
      head: 'headingSix',
      coll: 'collapseSix',
      desc: 'Funkcja generująca losowe miasto'
    },
    {
      name: 'getRandomCountry',
      head: 'headingSeven',
      coll: 'collapseSeven',
      desc: 'Funkcja generująca losowe państwo'
    },
    {
      name: 'getRandomPhone',
      head: 'headingEight',
      coll: 'collapseEight',
      desc: 'Funkcja generująca losowy numer telefonu'
    },
    {
      name: 'getRandomAge',
      head: 'headingNine',
      coll: 'collapseNine',
      desc: 'Funkcja generująca losowy wiek'
    },
    {
      name: 'getRand',
      head: 'headingTen',
      coll: 'collapseTen',
      desc: 'Funkcja zwraca losowe dane z podanych parametrów np. getRand(jeden,dwa,trzy)'
    },
    {
      name: 'draw',
      head: 'headingEleven',
      coll: 'collapseEleven',
      desc: 'Użycie funkcji draw(rand(4-8),@,gmail,rand(1-2)). Metoda rand(4-8) zwróci string o długości od 4 znaków do 8 znaków'
    },
    
  ];

  constructor(private fileService: FileService, private route: ActivatedRoute, private router: Router) {
    
   }


  ngOnInit(): void {
    this.obj= JSON.stringify([{
      "imie": "getRandomName",
      "nazwisko": ['naz1', 'naz2', 'naz3'],
      "id": "Object",
      "email": false,
      "telefon": "",
      "adres": {
        "ulica": "aaaa",
        "dom": 12
      },
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
        //saveAs(new Blob([JSON.stringify(res)], {type: "text/plain;charset=utf-8"}), "random.json")
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



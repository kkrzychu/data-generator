import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { Tab } from 'src/app/tab.model';
import { HttpClient } from '@angular/common/http';
// 


@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  valid: boolean = false; 
  listsFromDB = {};
  textArea;
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

  functionNameTab: any[] = [
    {
      name: 'Procentowe wypełnienie danych',
      head: 'headingZero',
      coll: 'collapseZero',
      desc: ['Funkcja ta jest odpowiedzialna za wypełnienie danymi. Użytkownik podaje ile procent danych ma być wygenerowanych, a ile pustych', 
      'Przykład implementacji: "imie,(80%)": "getRandomName"']
    },
    {
      name: 'id',
      head: 'headingOne',
      coll: 'collapseOne',
      desc: ['Funkcja numerująca obiekty.', 'Przykład implementacji: id']
    },
    {
      name: 'getRandomString',
      head: 'headingTwo',
      coll: 'collapseTwo',
      desc: ['Funkcja zwraca losowo wygenerowany string w zależności od podanych argumentów przez użytkownika. Argumenty są podawane po przecinku. Metoda randStr() wygeneruje string z losowo wybranych znaków alfabetu oraz długości podanej przez użytkownika, metoda randNum() wygeneruje string składający się z cyfr z podanego przedziału przez użytkownika oraz użytkownik może sam podać string, który będzie łączyny z innymi argumentami',
      'Przykład implementacji: getRandomString(randStr(3-8),randNum(1-10),@,randStr(2-4),.,randStr(1-2))']
    },
    {
      name: 'getRand',
      head: 'headingThree',
      coll: 'collapseThree',
      desc: ['Funkcja zwraca losowo wybrany string z podanych parametrów.', 
      'Przykład implementacji: getRand(styczeń,kwiecień,wrzesień)']
    },
    {
      name: 'getRandomAge',
      head: 'headingFour',
      coll: 'collapseFour',
      desc: ['Funkcja zwraca losowo wygenerowany wiek z przedziału od 1 do 100',
            'Przykład implementacji: getRandomAge']
    },
    {
      name: 'getRandomPhone',
      head: 'headingFive',
      coll: 'collapseFive',
      desc: ['Funkcja zwraca losowy wygenerowany numer telefonu z przedziału od 100000000 do 999999999',
      'Przykład implementacji: getRandomPhone']
    },
    {
      name: 'getRandomBoolean',
      head: 'headingSix',
      coll: 'collapseSix',
      desc: ['Funkcja zwraca losowo wartość true lub false', 'Przykład implementacji: getRandomBoolean']
    },
    {
      name: 'getRandomIntNumber',
      head: 'headingSeven',
      coll: 'collapseSeven',
      desc: ['Funkcja zwraca losową liczbę całkowitą z podanego przedziału przez użytkownika',
      'Przykład implementacji: getRandomIntNumber(10-40)']
    },
    {
      name: 'getRandomFloatNumber',
      head: 'headingEight',
      coll: 'collapseEight',
      desc: ['Funkcja zwraca losową liczbę zmiennoprzecinkową z podanego przedziału przez użytkownika',
      'Przykład implementacji: getRandomFloatNumber(2000-3000)']
    },
    
  ];

  tabToChange: any[] = [
    {
      name: 'getRandomName',
      head: 'headingNine',
      coll: 'collapseNine',
      desc: '',
      desc2: 'Możliwość dostosowania tablicy, z której będzie losowane imię',
      desc3: 'Przykład implementacji: getRandomName'
    },
    {
      name: 'getRandomLastName',
      head: 'headingTen',
      coll: 'collapseTen',
      desc: 'Funkcja generująca losowe nazwisko',
      desc2: 'Możliwość dostosowania tablicy, z której będzie losowane nazwisko',
      desc3: 'Przykład implementacji: getRandomLastName'
    },
    {
      name: 'getRandomEmail',
      head: 'headingEleven',
      coll: 'collapseEleven',
      desc: 'Funkcja generująca losowy email',
      desc2: 'Możliwość dostosowania tablicy, z której będzie losowany email',
      desc3: 'Przykład implementacji: getRandomEmail'
    },
    {
      name: 'getRandomAddress',
      head: 'headingTwelve',
      coll: 'collapseTwelve',
      desc: 'Funkcja generująca losowy adres',
      desc2: 'Możliwość dostosowania tablicy, z której będzie losowany adres',
      desc3: 'Przykład implementacji: getRandomAddress'
    },
    {
      name: 'getRandomCity',
      head: 'headingThirten',
      coll: 'collapseThirten',
      desc: 'Funkcja generująca losowe miasto',
      desc2: 'Możliwość dostosowania tablicy, z której będzie losowana nazwa miasta',
      desc3: 'Przykład implementacji: getRandomCity'
    },
    {
      name: 'getRandomCountry',
      head: 'headingFourteen',
      coll: 'collapseFourteen',
      desc: 'Funkcja generująca losowe państwo',
      desc2: 'Możliwość dostosowania tablicy, z której będzie losowana nazwa państwa',
      desc3: 'Przykład implementacji: getRandomCountry'
    }
  ];
  

  constructor(private http: HttpClient, private fileService: FileService, private route: ActivatedRoute, private router: Router) {
    
   }


  ngOnInit(): void {
    this.fileService.getLists().subscribe((response) => {
      // console.log(response);
      this.listsFromDB = response;
      // console.log(this.listsFromDB[0].tab[0]);
      this.tabToChange[0].desc = this.listsFromDB[0].tab;
      this.tabToChange[1].desc = this.listsFromDB[1].tab;
      this.tabToChange[2].desc = this.listsFromDB[2].tab;
      this.tabToChange[3].desc = this.listsFromDB[5].tab;
      this.tabToChange[4].desc = this.listsFromDB[4].tab;
      this.tabToChange[5].desc = this.listsFromDB[3].tab;
    })
    
    this.obj= JSON.stringify([{
      "id": "id",
      "imie,(80%)": "getRandomName",
      "nazwisko,(30%)": ['getRandomLastName', 'naz2', 'getRandomLastName'],
      "dane": {
        "telefon": 
        [
          {
            "imie": "getRandomName",
            "tel": "getRandomPhone",
            "email,(60%)": ["getRandomEmail", "getRandomString(randStr(3-8),randNum(1-10),@,randStr(2-4),.,randStr(1-2)"]
          },
          {
            "imie": "getRandomName",
            "tel": "getRandomPhone",
            "email": "getRandomEmail"
          },
          {
            "imie": "getRandomName",
            "tel,(80%)": "getRandomPhone",
            "email": "getRandomEmail"
          },
        ]
      },
      "adres": {
        "ulica,(70%)": "getRandomAddress",
        "miasto": "getRandomCity",
        "panstwo": "getRandomCountry"
      },
      "osoba,(90%)": {
        "imie": ["getRandomName", "Piotr"],
        "wiek": "getRandomAge",
        "bool,(50%)": "getRandomBoolean",
        "wyplata": {
          "miesiac": ["getRand(styczeń,kwiecień,wrzesień)", "getRandomFloatNumber(2000-3000)"],
          "pracownik": {
            "id": "getRandomIntNumber(10-40)",
            "hasła": 
            [
              {"has1": "getRandomString(randStr(3-9),@#$,randNum(70-100),qwerty)"},
              {"has2": "getRandomString(randStr(3-9),@#$,randNum(70-100),qwerty)"},
              {"has3,(40%)": "getRandomString(randStr(3-9),@#$,randNum(70-100),qwerty)"},
            ]
          }
        }
      }
    }], null, ' ');
    
  }



  generateFile(num) {
    // console.log(this.arrayOfFields);
    if(true) {
      this.show = false;
      let obj: Object = {
        tabOfInputs: this.obj,
        numberOfInputs: num,
        tabOfData: this.tabToChange
      };
      
      this.fileService.generateFile(obj).subscribe((res) => {
        console.log(typeof res);
        // saveAs(new Blob([JSON.stringify(res)], {type: "application/json"}), "random.json")
        saveAs(res, "random.json")
      });
    } else {
      this.show = true;
    }
  }

  
  showTest() {
    // console.log(this.obj);
  }
}



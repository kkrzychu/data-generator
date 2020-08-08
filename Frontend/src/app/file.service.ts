import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private webReqSer: WebRequestService) { }


  generateFile(obj) {
    return this.webReqSer.post('generator', { obj });
  }

}

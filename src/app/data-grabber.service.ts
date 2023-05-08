import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DataGrabberService {
  constructor(private _http: HttpClient) { }

  getData(url: string) {
    return this._http.get(url)
  }

  postData(url: string, body: any) {
    return this._http.post(url, body)
  }
}

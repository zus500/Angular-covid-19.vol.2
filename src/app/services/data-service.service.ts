import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private  url ="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-25-2020.csv";


  constructor( private http: HttpClient) { }


  getGlobaData(){
   return this.http.get(this.url , {responseType : 'text'}).pipe(
    map(result => {

      let rows = result.split('\n');
      console.log(rows);
      return [];
    })
   );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { GlobalDataSummary } from '../model/global-data';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private  url ="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-25-2020.csv";


  constructor( private http: HttpClient) { }


  getGlobaData(){
   return this.http.get(this.url , {responseType : 'text'}).pipe(
    map(result => {
      let data: GlobalDataSummary[] = [];
      let raw = {};
      let rows = result.split('\n');
      rows.splice(0 ,1);
      // console.log(rows);
      rows.forEach(row => {
            let cols = row.split(/,(?=\S)/)
            let cs = {
              country: cols[3],
              confirmed: +cols[7],
              deaths: +cols[8],
              recovered: +cols[9],
              active: +cols[10]
            } 
          let temp: GlobalDataSummary = raw[cs.country];
          if(temp){
            temp.country = cs.country + temp.country;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;
            temp.active = cs.active + temp.active;

            raw[cs.country] = temp;
          }else{
            raw[cs.country] = cs;
          }
      })

      return <GlobalDataSummary[]>Object.values(raw);
    })
   );
  }
}

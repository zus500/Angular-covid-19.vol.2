import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import { GlobalDataSummary } from '../model/global-data';
import { getdatenow } from '../components/function/GetDateNow';
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private  notFullUrl ="https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/";
  private  doMain = ".csv" 
  private date =getdatenow() ;
  private fullUrl = this.notFullUrl + this.date + this.doMain;

  constructor( private http: HttpClient) { }

   
  
  getGlobaData(){
    console.log(getdatenow());
   return this.http.get(this.fullUrl , {responseType : 'text'}).pipe(
     
    map(result => {
      let data: GlobalDataSummary[] = [];
      let raw = {};
      let rows = result.split('\n');
      rows.splice(0 ,1);
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

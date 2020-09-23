import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  constructor(private datesservice: DataServiceService ) { }
  
  countries :String[] =[]
  
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;

  ngOnInit(): void {
    this.datesservice.getGlobaData().subscribe(result =>{
      result.forEach(cs => {
          this.countries.push(cs.country);
      })
    });
  }

  updateValues(countru: string){
    console.log(countru);

  }

}


export function getdatenow(){
  let date = new Date();
  let year = date.getFullYear().toString();
  let month =  date.toLocaleDateString().substring(3 ,5 );
  let day =  Number (date.toLocaleDateString().substring(0 , 2 )) -1 ;
    if(day >= 1 && day < 10 ) 
        return month + "-" +"0"+day+"-"+year;
    else 
        return month + "-"+day+"-"+year;
}

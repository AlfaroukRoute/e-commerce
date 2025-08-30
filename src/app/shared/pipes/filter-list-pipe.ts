import { Pipe, PipeTransform } from '@angular/core';


// "A" == "a"

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  transform(value: any[], term :string): any[] {

    console.log(value);
    

   const filtredArray =  value.filter((item)=>{
      return item.title.toLowerCase().includes(term.toLowerCase())
    })





    return filtredArray;
  }

}

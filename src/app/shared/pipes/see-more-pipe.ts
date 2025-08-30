import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore'
})
export class SeeMorePipe implements PipeTransform {

  transform(value: string, numOfWords : number): string {
    console.log(value);
    
    return `${value.split(" ").slice(0, numOfWords).join(" ")} ...see more`;
  }

}

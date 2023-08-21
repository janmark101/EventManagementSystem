import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(value: any,filter :string): any {
    if (value.length=== 0){
      return value;
    }
    const resultArray = [];
    for (const item of value) {
      if (item.title.toUpperCase().includes(filter.toUpperCase())){
        resultArray.push(item);
      }
      
    }
    return resultArray;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultPosts =[];
    for (const product of value){
      if(product.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || product.dui.toLowerCase().indexOf(arg.toLowerCase()) > -1 || product.category.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultPosts.push(product);
      }
    }
    return resultPosts;
  }

}

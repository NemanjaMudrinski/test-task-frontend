import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) { return []; }
    if (!searchText) { return items; }

    searchText = searchText.toLowerCase();
    return items.filter(it => {
      return it.personalInfo.name.toLowerCase().includes(searchText)
      // return it.personalInfo.farmName.toLowerCase().includes(searchText); // || it.surname.toLowerCase().includes(searchText);
    });
  }

}

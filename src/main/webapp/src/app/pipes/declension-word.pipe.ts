import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'declensionWord'
})
export class DeclensionWordPipe implements PipeTransform {

  transform(count: number, title: string): string {
    let newWord: string;
    if (count > 1) {
      title = title + 's';
    }
    return newWord = count + ' ' + title;
  }

}

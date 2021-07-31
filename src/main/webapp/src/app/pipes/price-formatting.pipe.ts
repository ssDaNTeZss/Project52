import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'priceFormatting'
})
export class PriceFormattingPipe implements PipeTransform {

  transform(value: number): string {
    let newWord: string;

    return newWord = value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');;
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(heroe: Heroe ): string {

    if( !heroe.id ) {
      return 'assets/no-image.png';    
    } else if ( heroe.alt_img ) {
      return heroe.alt_img;
    } else {
      return `assets/heroes/${ heroe.id }.jpg`
    }

    return `/assets/heroes/${heroe.id}.jpg`;
  }

}

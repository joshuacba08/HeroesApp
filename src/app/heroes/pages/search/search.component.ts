import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [`
    /* .example-full-width {
      width: 100%;
    } */
  `]
})
export class SearchComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  hereoSeleccionado: Heroe | undefined;
  
  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( heroes  => this.heroes = heroes);
  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent) {

    if( !event.option.value ){
      this.hereoSeleccionado = undefined;
      return
    }

    const heroe: Heroe =  event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroeById( heroe.id )
      .subscribe( heroe => this.hereoSeleccionado = heroe );
  }

}

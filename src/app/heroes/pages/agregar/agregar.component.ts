import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroes.interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width:100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];
  
  
  heroe: Heroe = {
    superhero:'',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics, 
    alt_img: '' 
  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               private dialog: MatDialog ) { }

  ngOnInit(): void {


    if( !this.router.url.includes('editar') ){
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroeById( id ) )
      )
      .subscribe( heroe => this.heroe = heroe );

  }

  save(){

    if( this.heroe.superhero.trim().length === 0){
      return;
    };
    // Actualizar
    if( this.heroe.id ) {

      this.heroesService.actualizarHeroe( this.heroe )
        .subscribe( heroe => { console.log('Actualizando', heroe );
          this.showSnakbar('Registro actualizado 😉');        

      });

    } else {
    // Crear
      this.heroesService.agregarHeroe( this.heroe )
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id ]);
          this.showSnakbar('Registro creado 😉');
        });
      
    }
  } 
  

  deleteHeroe(){

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '90%',
      maxWidth: '550px',
      data: { ...this.heroe} //uso spread para asegurarme de no modificar el objeto real
    });

    dialog.afterClosed().subscribe(
      (result) => {

        if(result){

          this.heroesService.borrarHeroe( this.heroe.id! )
          .subscribe( resp => {

          this.router.navigate(['/heroes']);

          });

        }

      }
    )

  }

  showSnakbar( message: string ): void {
    this.snackBar.open( message, 'Ok!', {
      duration: 2500
    })
  }

}

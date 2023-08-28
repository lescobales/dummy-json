import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',

})
export class SearchProductComponent implements OnInit {
  // {....."a"..."ab"..."abz"..."ab"..."abc"........}
  searchTerms = new Subject<string>();
  // {.....pokemonList(a)....pokemonList(ab)..}
  product$: Observable<Pokemon[]>;

  constructor(private router: Router,
              private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.product$ = this.searchTerms.pipe(
      // {.....a.ab...abz..ab...abc........}
      debounceTime(300),
      // {.....ab...ab...abc......}
      distinctUntilChanged(),
      // {.....ab......abc......}
      switchMap((term) => this.productService.searchProductList(term))
      // {.....pokemonList(ab)......pokemonList(abc)......}
      
    );
  }
search(term: string) {
  this.searchTerms.next(term);
}

goToDetailPokemon(pokemon: Pokemon){
  const link = ['/pokemon', pokemon.id];
  this.router.navigate(link);
}
}

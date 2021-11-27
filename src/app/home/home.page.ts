import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/domain/entities/city';
import { SearchInfo } from 'src/domain/entities/search-info';
import { LoadSearchedCitiesService } from 'src/domain/services/load-searched-cities.service';
import { RegisterSearchService } from 'src/domain/services/register-search.service';
import { SearchCityService } from 'src/domain/services/search-city.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  cities: City[];
  hasError: boolean = false;
  errorMessage: string;

  searchedCities: SearchInfo[];

  constructor(
    private readonly searchService: SearchCityService,
    private readonly registerCacheService: RegisterSearchService,
    private readonly loadCacheService: LoadSearchedCitiesService,
    private readonly router: Router
  ) {
  }

  async ionViewDidEnter() {
    this.searchedCities = await this.loadCacheService.getAll();
    console.log(this.searchedCities);
  }

  async onSearch(query: string) {
    try {
      this.hasError = false;

      this.cities = await this.searchService.search(query);
    } catch (error) {
      this.hasError = true;
      this.errorMessage = error.message;
    }
  }

  async onSelectCity(cityId: string) {
    await this.registerCacheService.register(Number(cityId));
    this.router.navigateByUrl(`/weather/${cityId}`);
  }
}

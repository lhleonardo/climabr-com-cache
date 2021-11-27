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
  ) {}

  async ionViewDidEnter() {
    // Mostra os itens ordenados a partir do último que foi aberto.
    // Se abrir novamente um que já tinha sido consultado, atualiza a data de acesso
    // e as informações de detalhes no cache.
    const cities = await this.loadCacheService.getAll();

    cities.sort(
      (item1, item2) => {
        const d1 = new Date(item1.accessDate);
        const d2 = new Date(item2.accessDate);

        if (d1 < d2) return 1;
        if (d1 > d2) return -1;

        return 0;
      }
    );

    this.searchedCities = cities;
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

  async onClearCityHistory() {
    if (confirm('Deseja realmente apagar o histórico de consultas?')) {
      await this.loadCacheService.clear();
      this.searchedCities = [];
    }
  }

  async onSelectCity(cityId: string) {
    await this.registerCacheService.register(Number(cityId));
    this.router.navigateByUrl(`/weather/${cityId}`);
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SearchCityService } from 'src/domain/services/search-city.service';
import { LoadWeatherService } from 'src/domain/services/load-weather.service';
import { LocalCityRepository } from 'src/data/local-city-repository';
import { ApiWeatherRepository } from 'src/data/api-weather-repository';
import { LoadSearchedCitiesService } from 'src/domain/services/load-searched-cities.service';
import { LocalStorageSearchCacheRepository } from 'src/data/local-search-cache-repository';
import { RegisterSearchService } from 'src/domain/services/register-search.service';
import { CityRepository } from 'src/domain/services/protocols/city-repository';
import { WeatherRepository } from 'src/domain/services/protocols/weather-repository';

const createSearchedCitiesService = (
  storage: Storage
): LoadSearchedCitiesService => {
  return new LoadSearchedCitiesService(
    new LocalStorageSearchCacheRepository(storage)
  );
};

const createRegisterSearchCityService = (
  storage: Storage,
  cityRepository: CityRepository,
  weatherRepository: WeatherRepository
): RegisterSearchService => {
  return new RegisterSearchService(
    new LocalStorageSearchCacheRepository(storage),
    weatherRepository,
    cityRepository
  );
};

const createCityRepository = () => {
  return new LocalCityRepository();
};

const createWeatherRepository = (http: HttpClient) => {
  return new ApiWeatherRepository(http);
};

const createSearchCityService = () => {
  return new SearchCityService(new LocalCityRepository());
};

const createLoadWeatherService = (http: HttpClient) => {
  return new LoadWeatherService(
    new LocalCityRepository(),
    new ApiWeatherRepository(http)
  );
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: CityRepository, useFactory: createCityRepository },
    {
      provide: WeatherRepository,
      useFactory: createWeatherRepository,
      deps: [HttpClient],
    },
    {
      provide: SearchCityService,
      useFactory: createSearchCityService,
    },
    {
      provide: LoadWeatherService,
      useFactory: createLoadWeatherService,
      deps: [HttpClient],
    },
    {
      provide: RegisterSearchService,
      useFactory: createRegisterSearchCityService,
      deps: [Storage, CityRepository, WeatherRepository],

    },
    {
      provide: LoadSearchedCitiesService,
      useFactory: createSearchedCitiesService,
      deps: [Storage],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

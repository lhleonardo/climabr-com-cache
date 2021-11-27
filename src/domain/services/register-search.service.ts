import { City } from '../entities/city';
import { Weather } from '../entities/weather';
import { CityRepository } from './protocols/city-repository';
import { SearchCacheRepository } from './protocols/search-cache-repository';
import { WeatherRepository } from './protocols/weather-repository';

export class RegisterSearchService {
  private cacheRepository: SearchCacheRepository;
  private weatherRepository: WeatherRepository;
  private cityRepository: CityRepository;

  constructor(
    cacheRepository: SearchCacheRepository,
    weatherRepository: WeatherRepository,
    cityRepository: CityRepository
  ) {
    this.cacheRepository = cacheRepository;
    this.weatherRepository = weatherRepository;
    this.cityRepository = cityRepository;
  }

  public async register(cityId: number): Promise<void> {
    const cityDetails: City = await this.cityRepository.getById(cityId);

    const weatherDetails: Weather = await this.weatherRepository.load(
      cityDetails.coord
    );

    const cacheDetails = {
      temp: weatherDetails.currentTemp,
      conditionIconUrl: weatherDetails.details[0].conditionIconUrl,
    };

    this.cacheRepository.registerOrReplace({
      city: cityDetails,
      details: cacheDetails,
    });
  }
}

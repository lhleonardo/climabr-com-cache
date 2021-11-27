import { Storage } from '@ionic/storage-angular';
import { SearchInfo } from 'src/domain/entities/search-info';
import {
  CacheRegistrationDTO,
  SearchCacheRepository
} from 'src/domain/services/protocols/search-cache-repository';

const STORAGE_KEY_PREFIX = '__climabr_cache:search_cities';

export class LocalStorageSearchCacheRepository
  implements SearchCacheRepository
{
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  async registerOrReplace({
    city,
    details,
  }: CacheRegistrationDTO): Promise<void> {
    const searchedCities = await this.getAll();

    const cityAlreadyExists = searchedCities.findIndex(
      (registry) => registry.city.id === city.id
    );

    const newRegistry: SearchInfo = {
      accessDate: new Date(),
      details,
      city,
    };

    console.log(cityAlreadyExists);

    if (cityAlreadyExists !== -1) {
      const index = cityAlreadyExists;

      searchedCities[index] = newRegistry;
    } else {
      searchedCities.push(newRegistry);
    }

    // salva novamente o JSON
    await this.storage.set(STORAGE_KEY_PREFIX, JSON.stringify(searchedCities));

    console.log("Registrado!");
  }

  async getAll(): Promise<SearchInfo[]> {
    const stringInfo = await this.storage.get(STORAGE_KEY_PREFIX);

    if (!stringInfo) {
      return [];
    }

    const searchedCities: SearchInfo[] = JSON.parse(stringInfo);

    console.log(searchedCities);

    return searchedCities;
  }

  clear(): Promise<void> {
    return this.storage.remove(STORAGE_KEY_PREFIX);
  }
}

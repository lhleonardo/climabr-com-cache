import { SearchInfo } from '../entities/search-info';
import { SearchCacheRepository } from './protocols/search-cache-repository';

export class LoadSearchedCitiesService {
  constructor(private cacheRepository: SearchCacheRepository) {}

  public async getAll(): Promise<SearchInfo[]> {
    return this.cacheRepository.getAll();
  }

  public async clear(): Promise<void> {
    return this.cacheRepository.clear();
  }
}

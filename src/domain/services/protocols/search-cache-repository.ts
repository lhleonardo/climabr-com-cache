import { City } from 'src/domain/entities/city';
import { SearchInfo } from 'src/domain/entities/search-info';

export type CacheRegistrationDTO = {
  city: City;
  details: {
    temp: number;
    conditionIconUrl: string;
  };
};

export interface SearchCacheRepository {
  registerOrReplace(info: CacheRegistrationDTO): Promise<void>;

  getAll(): Promise<SearchInfo[]>;
  clear(): Promise<void>;
}

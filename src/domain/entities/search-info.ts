
export type SearchInfo = {
  city: {
    id: number;
    name: string;
    state: string;
  };
  details: {
    temp: number;
    conditionIconUrl: string;
  };
  accessDate: Date;
};

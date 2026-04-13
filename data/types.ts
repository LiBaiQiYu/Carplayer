export interface CarItem {
  name: string;
  year: number;
  carplay: boolean;
  carlife: boolean;
  hicar: boolean;
  iccoa: boolean;
  /** 推荐指数，1-5 或 undefined */
  recommend?: 1 | 2 | 3 | 4 | 5;
}

export interface Brand {
  name: string;
  country: Country;
  data: CarItem[];
}

export type Country = 'China' | 'France' | 'Germany' | 'Japan' | 'Korea' | 'UK';

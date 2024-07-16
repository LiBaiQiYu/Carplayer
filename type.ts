interface Item {
  name: string;
  year: number;
  carplay: boolean;
  carlife: boolean;
  hicar: boolean;
  iccoa: boolean;
  recommend: number | undefined;
}

interface Brand {
  name: string,
  data: Item[]
}
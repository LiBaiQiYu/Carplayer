function createData(
  name: string,
  year: number,
  carplay: boolean,
  carlife: boolean,
  hicar: boolean,
  iccoa: boolean,
  recommend?: number,
) {
  return { name, year, carplay, carlife, hicar, iccoa, recommend };
}

export {
  createData
}
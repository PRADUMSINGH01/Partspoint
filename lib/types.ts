export interface Part {
  id: string;
  sku: string;
  partNumber?: string; // if your backend returns this field
  name?: string;
  brand?: string;
  compatibleModels?: string[]; // if returned
  price?: number;
  stock?: number;
  // ...other fields your API returns
}

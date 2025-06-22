export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductSpecGroup {
  title: string;
  icon: string;
  iconColor: string;
  specs: ProductSpec[];
}

export interface ProductFeature {
  icon: string;
  iconColor: string;
  title: string;
  description: string;
}

export interface ProductInfo {
  id: string;
  title: string;
  description: string;
  modelPath: string;
  features: ProductFeature[];
  specGroups: ProductSpecGroup[];
  basicSpecs: ProductSpec[];
}

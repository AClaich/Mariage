export interface FormState {
  participation1: string[];
  participation2: string[];
  vegetarien1: boolean;
  vegetarien2: boolean;
  hebergement1: boolean;
  hebergement2: boolean;
  jourHebergement1: string[];
  jourHebergement2: string[];
}

export interface UserEntity {
  prenom: string;
  nom: string;
  email: string;
  password: string;
  number: number;
  isVin: number;
  isReception: number;
  isRetour: number;
  presenceVin1: number;
  presenceReception1: number;
  presenceRetour1: number;
  presenceVin2: number;
  presenceReception2: number;
  presenceRetour2: number;
  vegetarien1: number;
  logement1: number;
  vegetarien2: number;
  logement2: number;
  jeudi1: number;
  vendredi1: number;
  samedi1: number;
  jeudi2: number;
  vendredi2: number;
  samedi2: number;
}

export interface LoginFormState {
  username: string;
  password: string;
}

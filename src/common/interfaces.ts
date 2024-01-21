export interface FormState {
  user1: UserFormState;
  user2: UserFormState;
}

export interface UserFormState {
  participation: string[];
  vegetarien: boolean;
  hebergement: boolean;
  jourHebergement: string[];
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

export interface State {
  count: number;
  currentUser: {
    user1: UserEntity;
    user2: UserEntity;
  };
}

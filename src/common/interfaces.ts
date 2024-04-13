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
  id: number;
  attributes: UserAttributes;
}

export interface UserAttributes {
  prenom: string;
  nom: string;
  email: string;
  password: string;
  number: number;
  can_invite: number;
  is_vin: number;
  is_reception: number;
  is_retour: number;
  presence_vin_1: number;
  presence_reception_1: number;
  presence_retour_1: number;
  presence_vin_2: number;
  presence_reception_2: number;
  presence_retour_2: number;
  vegetarien_1: number;
  logement_1: number;
  vegetarien_2: number;
  logement_2: number;
  jeudi_1: number;
  vendredi_1: number;
  samedi_1: number;
  jeudi_2: number;
  vendredi_2: number;
  samedi_2: number;
  published_at: string;
}

export interface LoginFormState {
  username: string;
  password: string;
}

export interface State {
  currentUser: {
    id: number;
    user1: UserAttributes;
    user2: UserAttributes;
  } | null;
  listUsers: UserEntity[] | null;
}

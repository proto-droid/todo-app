export interface MurderPartyScenario {
  id: string;
  titre: string;
  theme: string;
  nombreJoueurs: string;
  difficulte: string;
  duree: string;
  description: string;
  sheetUrl: string;
  sheetId: string;
  roles: string[];
  indices: string[];
  solution: string;
}

export interface ScenarioDetails {
  personnages: Personnage[];
  timeline: TimelineEvent[];
  indices: Indice[];
  solution: Solution;
}

export interface Personnage {
  id: string;
  nom: string;
  role: string;
  secret: string;
  alibi: string;
  estMeurtrier: boolean;
}

export interface TimelineEvent {
  temps: string;
  phase: string;
  description: string;
  indicesReveles: string[];
}

export interface Indice {
  id: string;
  titre: string;
  description: string;
  revelation: string;
  type: string;
}

export interface Solution {
  coupable: string;
  arme: string;
  lieu: string;
  mobile: string;
  deroulement: string;
}

export interface QuizQuestion {
  id: string;
  categorie: string;
  question: string;
  reponseA: string;
  reponseB: string;
  reponseC: string;
  reponseD: string;
  bonneReponse: string;
  explication: string;
  difficulte: string;
}

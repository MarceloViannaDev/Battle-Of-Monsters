import { Monster } from "./monster.interface";

export interface BattleResponse {
  winner: Monster | null;
  tie: boolean;
}
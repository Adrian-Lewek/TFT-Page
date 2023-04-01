export interface DataSummonerName {
  accountId: string,
  id: string,
  name:string,
  profileIconId: number,
  puuid: string,
  revisionDate: number,
  summonerLevel: number
}
export interface DataSummonerRank {
  freshBlood: boolean,
  hotStreak: boolean,
  inactive: boolean,
  leagueId: string,
  leaguePoints: number,
  losses: number,
  queueType: string,
  rank: string,
  summonerId: string,
  summonerName: string,
  tier: string,
  veteran: boolean,
  wins: number,
}
export interface State {
  user: string,
  summonerID: string;
  region: string;
}
export const HOST = "https://bored-ruby-stole.cyclic.app/";

export interface IDataSummonerName {
  accountId: string,
  id: string,
  name:string,
  profileIconId: number,
  puuid: string,
  revisionDate: number,
  summonerLevel: number
}
export interface IDataSummonerRank {
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
export interface ILang_EN {
  items:
    {
      apiName: string,
      desc: string,
      name: string
      icon: string
    }[],
  setData: {
    champions: 
      {
        ability: {
          desc: string,
          icon: string,
          name: string,
          variables: number[]
        },
        apiName: string,
        cost: number,
        icon: string,
        name: string,
        traits: string[]
      } []
    ,
    mutator: string,
    name: string,
    number: number,
    traits:
      {
        apiName: string,
        desc: string,
        icon: string,
        name: string
      } []
}[],

}
export interface IMatchInfo{
  metadata: {
    participants: string[]
  },
  info : {
    game_datetime: number,
    game_length: number,
    participants: {
      augments: string[],
      companion :{
        skin_ID: number
        item_ID : number
      },
      gold_left: number,
      last_round: number,
      level: number,
      partner_group_id: number,
      placement: number,
      puuid: string,
      time_eliminated: number,
      traits: {
        name: string,
        num_units: number,
        style: number,
        tier_current: number,
        tier_total: number
      }[],
      units: {
        character_id: string,
        itemNames: string[]
        name: string,
        rarity: number,
        tier: number
      }[]

    }[],
    queue_id: number,
    tft_game_type: string,
    tft_set_number: 8
  }
}
export interface ILittleLegendsImages {
  data: {
    id: string,
    image: {
      full: string,
    },
    name:string,
    tier: string
  }[]
}
export interface IFiles{
  data: 
  {
    [key: string]:{
      id: string,
      image: {
        full: string
      },
      name: string
    }
  }
}
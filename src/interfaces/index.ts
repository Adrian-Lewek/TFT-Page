export const HOST = "https://bored-ruby-stole.cyclic.app/";

//basic informations about summoner
export interface IDataSummonerName {
  accountId: string,
  id: string,
  name:string,
  profileIconId: number,
  puuid: string,
  revisionDate: number,
  summonerLevel: number
}
//summoner rank informations
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
//all informations about nearly everything O_o
export interface ILang_EN {
  items:
    {
      name: string
      apiName: string,
      cost: number,
      desc: string,
      icon: string,
      effects: {
        [key: string]: number 
      }
      abitlity: {
        desc: string,
        name: string,
        variables: {
          name: string,
          value: number[]
        }[]
      }
      stats: {
        armor: number,
        attackSpeed: number,
        critChance: number,
        critMultiplier: number,
        damage: number,
        hp: number,
        initialMana: number,
        magicResist: number,
        mana: number,
        range: number,
      }
      traits: string[]
    }[],
  setData: {
    champions: 
      {
        ability: {
          desc: string,
          icon: string,
          name: string,
          variables: {
            name: string,
            value: number[]
          }[]
        },
        stats: {
          armor: number,
          attackSpeed: number,
          critChance: number,
          critMultiplier: number,
          damage: number,
          hp: number,
          initialMana: number,
          magicResist: number,
          mana: number,
          range: number,
        }
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
        effects: {
          variables: {
           [key: string]: number 
          }
        }[]
      } []
}[],
  sets: {
    [key:number] : {
    champions: 
      {
        ability: {
          desc: string,
          icon: string,
          name: string,
          variables: {
            name: string,
            value: number[]
          }[]
        },
        stats: {
          armor: number,
          attackSpeed: number,
          critChance: number,
          critMultiplier: number,
          damage: number,
          hp: number,
          initialMana: number,
          magicResist: number,
          mana: number,
          range: number,
        }
        apiName: string,
        cost: number,
        icon: string,
        name: string,
        traits: string[]
      } []
    ,
    name: string,
    traits:
      {
        apiName: string,
        desc: string,
        icon: string,
        name: string
        effects: {
          maxUnits: number,
          minUnits: number,
          style:number
          variables: {
           [key: string]: number 
          }
        }[]
      } []
    }
  }

}
//informations about match
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
//informations about little legend
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
//informations about augments, traits, champions (u can write here whatever you want if its from riot)
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
//basic informations about champions
export interface IChampion{
  id: string,
  image: {
    full: string,
  }
  name: string,
  tier: number
}
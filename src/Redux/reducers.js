import api from '../Api/pokedex'
import pokemonType from '../Assets/pokemontypes'

const initialState = {
    "pokemonList" : [],
    "pokemonDetails" : [],
    "pokemonDescription" : [],
    "pokemonStrong": [],
    "pokemonWeak": [],
    "searchPokemonList": [],
    "myTeam" : [],
    "myPokemon" : [],
    "myPokemonStats" : 0,
    "enemyTeam" : [],
    "enemyPokemon" : [],
    "enemyPokemonStats" : 0,
    "loading" : false,
    "error" : null,
    "numberPage" : 1,
}

const GET_POKEMONS = 'GET_POKEMONS';
const GET_DETAILS = 'GET_DETAILS';
const GET_DESCRIPTION = 'GET_DESCRIPTION';
const GET_TYPERELATION = 'GET_TYPERELATION';
const SEARCH_POKEMON = 'SEARCH_POKEMON';
const ADDTO_MYTEAM = 'ADDTO_MYTEAM';
const ADDTO_MYPOKEMON = 'ADDTO_MYPOKEMON';
const ADDTO_ENEMYTEAM = 'ADDTO_ENEMYTEAM';
const ADDTO_ENEMYPOKEMON = 'ADDTO_ENEMYPOKEMON';
const SUM_MYSTATS = 'SUM_MYSTATS';
const SUM_ENEMYSTATS = 'SUM_ENEMYSTATS';
const IS_LOADING = 'IS_LOADING';
const SUM_NUM = 'SUM_NUM';
const DEC_NUM = 'DEC_NUM';
const ERASE_STATE = 'ERASE_STATE';

export default function reducer (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case GET_POKEMONS : 
        if(action.payload.message) {
            return {
                ...state,
                error : action.payload.message,
                loading: false
            }
        } else {
            return {
                ...state,
                pokemonList : action.payload,
                error: null,
                loading: false,
            }
        }
        case GET_DETAILS : 
        if(action.payload.message) {
            return {
                ...state,
                error : 'Error, pls reload later',
                loading: false
            }
        } else {
            return {
                ...state,
                pokemonDetails : action.payload || state.pokemonDetails,
                error: null,
                loading: false,
            }
        }

        case GET_DESCRIPTION : 
        if(action.payload.response === 'error') {
            return {
                ...state,
                error : action.payload.error,
            }
        } else {
            return {
                ...state,
                pokemonDescription : action.payload,
                loading: false,
            }
        }

        case GET_TYPERELATION :
            return {
                ...state,
                pokemonStrong: action.payload,
                pokemonWeak: action.diffWeak || action.totalWeak,
                loading : false
            }
        case SEARCH_POKEMON :
            if(action.payload.message) {
                return {
                    ...state,
                    error: 'Error : Pokemon Not Found',
                    searchPokemonList : [],
                    loading: false
                }
            }else {
                return {
                    ...state,
                    searchPokemonList : action.payload,
                    error: null,
                    loading: false
                }
            }
        case ADDTO_MYPOKEMON :
            return {
                ...state,
                myPokemon: action.payload,
                loading: false
            }

        case ADDTO_MYTEAM :
            return {
                ...state,
                myTeam: action.payload,
            }
        case ADDTO_ENEMYPOKEMON :
            return {
                ...state,
                enemyPokemon: action.payload,
                loading: false
            }
        case ADDTO_ENEMYTEAM :
            return {
                ...state,
                enemyTeam: action.payload,
            }
        case SUM_MYSTATS :
            return {
                ...state,
                myPokemonStats: action.payload,
            }
        case SUM_ENEMYSTATS :
            return {
                ...state,
                enemyPokemonStats: action.payload,
            }
        case IS_LOADING :
            return {
                ...state,
                loading: action.payload,
            }
        case SUM_NUM :
            return {
                ...state,
                pokemonList:[],
                numberPage : action.payload
            }
        case DEC_NUM :
            return {
                ...state,
                pokemonList:[],
                numberPage : action.payload
            }
        case ERASE_STATE :
            return {
                ...state,
                pokemonDetails : [],
                pokemonDescription : [],
                typeRelations : [],
                searchPokemonList : [],
                enemyPokemon: [],
                loading : false,
                error : null,
                numberPage : 1,
            }
        default:
            return state;
    }
}

export const getPokemons = (numberPage) => async (dispatch, getState) => {
    try {
        const data = await api.pokedex.getPokemons(numberPage)
        dispatch({
            type : GET_POKEMONS,
            payload : data.results,
        })
    } catch (error) {
        dispatch ({
            type: GET_POKEMONS,
            payload: error,
        })
    }
}

export const getDetails = (id) => async (dispatch, getState) => {
    try {
        const data = await api.pokedex.getPokemonById(id)
        dispatch({
            type : GET_DETAILS,
            payload : data,
        })
    } catch (error) {
        dispatch ({
            type: GET_DETAILS,
            payload: error,
        })
    }
}

export const getDescription = (id) => async (dispatch, getState) => {
    try {
        const data = await api.pokedex.getPokemonDescription(id)
        dispatch({
            type : GET_DESCRIPTION,
            payload : data,
        })
    } catch (error) {
        dispatch ({
            type: GET_DESCRIPTION,
            payload: error,
        })
    }
}

export const getTypeRelation = (pokemon) => async (dispatch, getState) => {
    let type = []
    let weak = []
    let strong = []
  
    pokemon.types.map((types) =>(
      (type.push(pokemonType[types.type.name].name),
      weak.push(pokemonType[types.type.name].weak),
      strong.push(pokemonType[types.type.name].strong))
      ))
      if(weak.length > 1){
        const totalWeak = weak[0].concat(weak[1]).filter(val => !type.includes(val))
        const totalStrong = strong[0].concat(strong[1]).filter(val => !type.includes(val))
        let diffWeak = totalWeak.filter(val => !totalStrong.includes(val));
        let diffStrong = totalStrong.filter(val => !totalWeak.includes(val));
        diffStrong = [...new Set(diffStrong)]
        diffWeak = [...new Set(diffWeak)]
        dispatch({
            type : GET_TYPERELATION,
            payload : diffStrong, diffWeak
        })
      } else {
        const totalWeak = weak[0]
        const totalStrong = strong[0]
  
        dispatch({
            type : GET_TYPERELATION,
            payload : totalStrong, totalWeak
        })
      }
}

export const searchPokemon = (name) => async (dispatch, getState) => {
    try {
        const data = await api.pokedex.getPokemonById(name)
        dispatch({
            type: SEARCH_POKEMON,
            payload : data,
        })
      } catch (error) {
        dispatch({
            type: SEARCH_POKEMON,
            payload : error,
        })
      }
}

export const addMyPokemon = (pokemon) => (dispatch, getState) => {
    dispatch({
        type : ADDTO_MYPOKEMON,
        payload : pokemon
    })
}

export const addEnemyPokemon = () => async (dispatch, getState) => {
    const min = Math.floor(1)
    const max = Math.floor(555)
    const randomNum = Math.floor(Math.random() * (max - min +1)) +min
    try {
        const data = await api.pokedex.getPokemonById(randomNum)
        dispatch({
            type : ADDTO_ENEMYPOKEMON,
            payload : data,
        })
    } catch (error) {
        dispatch ({
            type: ADDTO_ENEMYPOKEMON,
            payload: error,
        })
    }
}

export const sumMyStats = (myPokemon) => (dispatch, getState) => {
    let myPokemonStats = []
    let myStats = []
    myPokemon.stats.map((stats) =>(
        myPokemonStats.push(stats.base_stat)
    ))
    let myHp = myPokemonStats.splice(0,1)
    let mySpeed = myPokemonStats.splice(-1,1)
    let myRandomStat = myPokemonStats[Math.floor(Math.random() * myPokemonStats.length)];
    myStats.push(myHp[0])
    myStats.push(mySpeed[0])
    myStats.push(myRandomStat) 
    const mySum = myStats.reduce((partialSuma, b) => partialSuma + b, 0)

    dispatch({
        type: SUM_MYSTATS,
        payload : mySum
    })
}

export const sumEnemyStats = (myPokemon) => (dispatch, getState) => {
    let myPokemonStats = []
    let myStats = []
    myPokemon.stats.map((stats) =>(
        myPokemonStats.push(stats.base_stat)
    ))
    let myHp = myPokemonStats.splice(0,1)
    let mySpeed = myPokemonStats.splice(-1,1)
    let myRandomStat = myPokemonStats[Math.floor(Math.random() * myPokemonStats.length)];
    myStats.push(myHp[0])
    myStats.push(mySpeed[0])
    myStats.push(myRandomStat) 
    const mySum = myStats.reduce((partialSuma, b) => partialSuma + b, 0)

    dispatch({
        type: SUM_ENEMYSTATS,
        payload : mySum
    })
}

export const isLoading = (trueFalse) => (dispatch, getState) => {
    dispatch({
        type: IS_LOADING,
        payload : trueFalse
    })
}

export const sumNum = (num) => (dispatch, getState) => {
    dispatch({
        type: SUM_NUM,
        payload : num + 1
    })
}

export const decNum = (num) => (dispatch, getState) => {
    dispatch({
        type: DEC_NUM,
        payload : num - 1
    })
}

export const eraseState = () => (dispatch, getState) => {
    dispatch({
        type: ERASE_STATE,
        payload : 'State deleted'
    })
}


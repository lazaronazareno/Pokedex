import api from '../Api/pokedex'

const initialState = {
    "pokemonList" : [],
    "pokemonDetails" : [],
    "pokemonImages": [],
    "loading" : false,
    "error" : null,
    "numberPage" : 1,
}

const GET_POKEMONS = 'GET_POKEMONS';
const GET_DETAILS = 'GET_DETAILS';
const GET_IMAGE = 'GET_IMAGE';
const IS_LOADING = 'IS_LOADING';
const SUM_NUM = 'SUM_NUM';
const DEC_NUM = 'DEC_NUM';

export default function reducer (state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case GET_POKEMONS : 
        if(action.payload.response === 'error') {
            return {
                ...state,
                error : action.payload.error,
                loading: false
            }
        } else {
            return {
                ...state,
                pokemonList : action.payload,
                details : [],
                loading: false,
            }
        }
        case GET_DETAILS : 
        if(action.payload.response === 'error') {
            return {
                ...state,
                error : action.payload.error,
                loading: false
            }
        } else {
            return {
                ...state,
                details : action.payload,
                loading: false,
            }
        }
        case GET_IMAGE :
            return {
                ...state,
                pokemonImages: action.payload,
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
export const getImage = (id) => async (dispatch, getState) => {
    try {
        const data = await api.pokedex.getPokemonImage(id)
        dispatch({
            type : GET_IMAGE,
            payload : data,
        })
    } catch (error) {
        dispatch ({
            type: GET_IMAGE,
            payload: error,
        })
    }
}

export const isLoading = () => (dispatch, getState) => {
    dispatch({
        type: IS_LOADING,
        payload : true
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
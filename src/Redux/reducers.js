import api from '../Api/pokedex'

const initialState = {
    "pokemonList" : [],
    "pokemonDetails" : [],
    "pokemonDescription" : [],
    "typeRelations": [],
    "loading" : false,
    "error" : null,
    "numberPage" : 1,
}

const GET_POKEMONS = 'GET_POKEMONS';
const GET_DETAILS = 'GET_DETAILS';
const GET_DESCRIPTION = 'GET_DESCRIPTION';
const GET_TYPERELATION = 'GET_TYPERELATION';
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
                pokemonDetails : action.payload,
                loading: false,
            }
        }

        case GET_DESCRIPTION : 
        if(action.payload.response === 'error') {
            return {
                ...state,
                error : action.payload.error,
                loading: false
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
                typeRelations: action.payload,
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

export const getTypes = (name) => async (dispatch, getState) => {
    try {
        const data = await api.pokedex.getTypeRelation(name)
        dispatch({
            type : GET_TYPERELATION,
            payload : data,
        })
    } catch (error) {
        dispatch ({
            type: GET_TYPERELATION,
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
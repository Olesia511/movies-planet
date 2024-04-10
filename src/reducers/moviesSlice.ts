import { ActionWithPayload, createReducer } from "../redux/utils";
import { AppThunk } from "../store";
import { client } from "../api/tmdb";

export interface Movie {
    id: number,
    title: string,
    popularity: number,
    overview: string,
    image?: string,
}

export interface MoviesState {
    top: Movie[],
    loading: boolean,
    page: number,
    hasMorePages: boolean,
}

const initialState: MoviesState = {
    top: [],
    loading: false,
    page: 0,
    hasMorePages: true,
}


const moviesLoaded = (movies: Movie[], page: number, hasMorePages: boolean) => ({
    type: "movies/loaded",
    payload: {movies, page, hasMorePages},
})

const moviesLoading = () => ({
   type: "movies/loading", 
})


export function fetchNextPage(): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
        const nextPage = getState().movies.page + 1;
        dispatch(fetchPage(nextPage))
         
        }
}

function fetchPage(page: number): AppThunk<Promise<void>> { 
    return async (dispatch) => {
        dispatch(moviesLoading());


        const config = await client.getConfiguration();
        const imageUrl = config.images.base_url;
        const nowPlaying = await client.getNowPlaying(page);

        const mappedResults: Movie[] = nowPlaying.results.map((m) => ({
            id: m.id,
            title: m.title,
            popularity: m.popularity,
            overview: m.overview,
            image: m.backdrop_path ? `${imageUrl}w780${m.backdrop_path}` : undefined
        }))

        const hasMorePages = nowPlaying.page < nowPlaying.totalPages;

        dispatch(moviesLoaded(mappedResults, page, hasMorePages));
    }
};



const moviesReducer = createReducer<MoviesState>(
    initialState,
    {
        "movies/loaded": (state, action: ActionWithPayload<{movies: Movie[], page: number, hasMorePages: boolean}>) => {
            return {
                ...state,
                top: [...state.top, ...action.payload.movies],
                page: action.payload.page,
                hasMorePages: action.payload.hasMorePages,
                loading: false,
            };
        },

        "movies/loading": (state, action) => {
            return {
                ...state,
                loading: true,
            }

        }
    }
)

export default moviesReducer;

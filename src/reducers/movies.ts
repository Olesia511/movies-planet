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

interface MoviesState {
    top: Movie[],
    loading: boolean,
}

const initialState: MoviesState = {
    top: [],
    loading: false,
}

const moviesLoaded = (movies: Movie[]) => ({
    type: "movies/loaded",
    payload: movies,
})

const moviesLoading = () => ({
   type: "movies/loading", 
})


export function fetchMovies(): AppThunk<Promise<void>> {
      return async (dispatch, getState) => {
            dispatch(moviesLoading());


            const config = await client.getConfiguration();
            const imageUrl = config.images.base_url;
            const results = await client.getNowPlaying();

            const mappedResults: Movie[] = results.map((m) => ({
                id: m.id,
                title: m.title,
                popularity: m.popularity,
                overview: m.overview, 
                image: m.backdrop_path? `${imageUrl}w780${m.backdrop_path}` : undefined }))
            dispatch(moviesLoaded(mappedResults));
        }
}




const moviesReducer = createReducer<MoviesState>(
    initialState,
    {
        "movies/loaded": (state, action: ActionWithPayload<Movie[]>) => {
            return {
                ...state,
                top: action.payload,
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

import { Action, Reducer } from "redux";

export interface Movie {
    id: number,
    title: string,
    popularity: number,
    overview: string
}

interface MoviesState {
    top: Movie[]
}

const initialState: MoviesState = {
    top: [
        { id: 1, title: "Inception", popularity: 98, overview: "Dreams Ipsum Dolor Sit AmetReference site about  " },
        { id: 2, title: "The Godfather", popularity: 97, overview: "Godfather.Lorem Ipsum generator: A plugin by Emmet, an toolkit for web-developers. After installation type lorem or lipsum , this will generate a 30-words dummy text," },
        { id: 3, title: "The Godfather Part II", popularity: 96, overview: "Part II..Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus nisl volutpat enim posuere, sed faucibus turpis placerat. Nam interdum neque libero, id ." },
        { id: 4, title: "The Dark Knight", popularity: 96.5, overview: "Batman.Lorem ipsum dolor sit amet, vide vituperatoribus et nec, stet denique similique ea mea, duo an etiam ignota constituam. Eum malis scripserit ea." }
        
    ]
}

const moviesReducer:Reducer<MoviesState, Action> = (state, action) => {
    return initialState;

}

export default moviesReducer;

import { useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch = useDispatch<AppDispatch>;

// export const useAppSelector = (
//   selector: (state: RootState) => any
// ) => {
//   return useSelector<RootState, any>(selector);
// }

export const useAppSelector = <TSelected>(
  selector: (state: RootState) => TSelected
) => {
  return useSelector<RootState, TSelected>(selector);
}
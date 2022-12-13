import { getRatio, getRemCoefficient, getWithinSh1Size } from "../../common/utils/viewport";
import { UIType } from "../actions";

const uiState = {
  width: null,
  height: null,
  ratio: null, 
  isWithinSh1Size: null, 
  remCoefficient: null
};

export const uiReducer = (
  state = uiState,
  action
) => {
  switch (action.type) {
    case UIType.SET_VIEWPORT_INTERFACE: {
      const { width, height } = action.payload;
      const ratio = getRatio(width, height);
      const isWithinSh1Size = getWithinSh1Size(width, ratio);
      const remCoefficient = getRemCoefficient(width);

      return {
        ...state, width, height, ratio, isWithinSh1Size, remCoefficient,
      };
    }

    default:
      return state;
  }
};

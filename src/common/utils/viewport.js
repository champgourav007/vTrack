import { ACCURACY, DEFAULT_FONT_SIZE, SH1_RATIO, SH1_WIDTH } from "../constants/viewport";

  
export const getRatio = (width, height) => 
Number((width / height).toFixed(ACCURACY));

export const getWithinSh1Size = (width, ratio) => 
width <= SH1_WIDTH && ratio >= SH1_RATIO;

export const getRemCoefficient = (width) => 
Number((width * DEFAULT_FONT_SIZE / SH1_WIDTH).toFixed(ACCURACY));
  
export const getCircularProgressColor = (value) => {
    if(value >= 0 && value <= 30){
      return {
        position: 'absolute',
        left: 0,
        color:"red",
      };
    }
    else if(value >= 31 && value <= 60){
      return {
        position: 'absolute',
        left: 0,
        color:"#daa520",
      };
    }
    else{
      return {
        position: 'absolute',
        left: 0,
        color:"green",
      };
    }
  }
import { LocaleType } from '../actions';

const initialState = { locale: 'en-US' };

export const localeReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case LocaleType.SWITCH_LOCALE:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};

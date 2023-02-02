export const LocaleType = {
  SWITCH_LOCALE: 'SWITCH_LOCALE'
}

export const switchLocale = (locale) =>
  ({
    type: LocaleType.SWITCH_LOCALE,
    payload: { locale },
  });
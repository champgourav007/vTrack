export const UIType = {
  SET_VIEWPORT_INTERFACE: 'SET_VIEWPORT_INTERFACE'
}

export const setViewportInterface =
  ({ width, height }) =>
    ({
      type: UIType.SET_VIEWPORT_INTERFACE,
      payload: { width, height },
    });

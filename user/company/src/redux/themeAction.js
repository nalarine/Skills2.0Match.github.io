import { THEME_MODE } from '../redux/constants/themeConstant'

export const toggleActionTheme = (themeMode) => (dispatch) => {
  dispatch({ type: THEME_MODE, payload: themeMode })
}

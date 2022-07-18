
import { getTheme } from '../../utils/tool'
const themeClass = getTheme() || 'default'
themeClass && (document.body.className += `theme-${themeClass}`)

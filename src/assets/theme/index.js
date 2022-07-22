
const themeClass = localStorage.getItem('__theme_key_') || 'default'
themeClass && (document.body.className += `theme-${themeClass}`)

const themeRegex = /:(.*?)\)/;

export function theme(thread) {
  const theme = themeRegex.exec(thread.title)[1];
  return theme.trim();
}
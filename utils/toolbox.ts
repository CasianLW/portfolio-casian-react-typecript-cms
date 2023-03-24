export function limitTitle(title: string, maxLength: number = 20): string {
  if (!title) {
    return ''
  }
  if (title.length > maxLength) {
    return title.substring(0, maxLength) + '...'
  }
  return title
}

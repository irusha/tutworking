export function pagesArrayCreator(page: number, maxPages: number) {
  let pages = []
  if (page == maxPages || page == maxPages - 1) {
    for (let i = page - 4; i <= maxPages; i++) {
      if (i > 0) {
        pages.push(i)
      }
    }
  }

  else if (page == 1 || page == 2) {
    for (let i = 1; i <= 5; i++) {
      if (i <= maxPages) {
        pages.push(i)
      }
    }
  }

  else {
    for (let i = page - 2; i <= page + 2; i++) {
      if (i <= maxPages) {
        pages.push(i)
      }
    }
  }
  return pages
}

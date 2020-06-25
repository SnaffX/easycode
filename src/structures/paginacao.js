module.exports = function Paginator ({ elements, length }) {
  this.pages = {
    actual: 1,
    total: Math.ceil(elements.length / length),
    length
  }

  this.nextPage = function nextPage () {
    const { actual, total } = this.pages
    if (actual < total) this.pages.actual++

    return this
  }

  this.prevPage = function prevPage () {
    const { actual } = this.pages
    if (actual > 1) this.pages.actual--

    return this
  }

  this.get = function get (removeFirst = false) {
    const { actual, length } = this.pages

    const [first, second] = getIndexsToSlice({ actual, length })
    const result = elements.slice(first + (removeFirst ? 1 : 0), second)

    return result
  }
}

function getIndexsToSlice ({ actual, length }) {
  if (!actual || !length || typeof actual !== 'number' || typeof length !== 'number') throw new TypeError(':pensive:')

  const firstIndex = (actual - 1) * length
  const secondIndex = actual * length
  return [firstIndex, secondIndex]
}
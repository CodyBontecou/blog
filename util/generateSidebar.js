import fg from 'fast-glob'
import matter from 'gray-matter'

const ignoreList = [
  'projects',
  'store',
  'index.md',
  'projects.md',
  'contact.md',
]

const dropdownOptions = [
  { text: 'NuxtJS', sortOrder: 1 },
  { text: 'VueJS', sortOrder: 2 },
  { text: 'Electron', sortOrder: 3 },
  { text: 'NodeJS', sortOrder: 4 },
  { text: 'Python', sortOrder: 5 },
  { text: 'Marketing', sortOrder: 6 },
  { text: 'Misc', sortOrder: 7 },
]

const sortMap = new Map(dropdownOptions.map(obj => [obj.text, obj.sortOrder]))

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const files = fg.sync(['**/*.md', '!**/node_modules', '!README.md'])
const sidebarGroupTitles = files
  .map(file => {
    const f = file.split('/')

    if (f.length === 2 && !ignoreList.some(el => f.indexOf(el) >= 0)) {
      return {
        title: capitalizeFirstLetter(f[1]),
        link: file,
      }
    }
  })
  .filter(file => {
    if (file !== undefined) {
      return file
    }
  })

const getItem = link => {
  const { data } = matter.read(link)
  return { text: data.title, link: link.split('/')[1] }
}
const getDropDown = link => {
  const { data } = matter.read(link)
  return data.dropdown
}

const generatedSidebar = sidebarGroupTitles.reduce((acc, { link }) => {
  const dropdown = getDropDown(link)

  if (!acc.some(el => el.text === dropdown)) {
    acc.push({ text: dropdown, collapsible: true, items: [getItem(link)] })
  } else {
    acc[acc.indexOf(acc.find(el => el.text === dropdown))].items.push(
      getItem(link)
    )
  }
  return acc
}, [])

export const sortedSidebar = generatedSidebar
  .slice()
  .sort((a, b) => sortMap.get(a.text) - sortMap.get(b.text))

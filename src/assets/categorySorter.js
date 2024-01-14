import categoriesData from './categories.json'

const categories = categoriesData.categories

export function getCategory (itemName) {
  for (const category in categories) {
    if (categories[category].includes(itemName)) {
      return category
    }
  }
  return 'Other'
}

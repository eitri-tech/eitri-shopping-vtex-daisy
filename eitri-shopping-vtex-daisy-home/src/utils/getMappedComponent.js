import Banner from '../components/CmsComponents/Banner/Banner'
import ProductShelf from '../components/CmsComponents/ProductShelf/ProductShelf'
import ProductTiles from '../components/CmsComponents/ProductTiles/ProductTiles'
import CategoryShelf from '../components/CmsComponents/CategoryShelf/CategoryShelf'
import CategoryTree from '../components/CmsComponents/CategoryTree/CategoryTree'
import CategoryTiles from '../components/CmsComponents/CategoryTiles/CategoryTiles'
import LastSeenProducts from '../components/CmsComponents/LastSeenProducts/LastSeenProducts'
import CategoryListSwipe from '../components/CmsComponents/CategoryListSwipe/CategoryListSwipe'

const componentMap = {
	MultipleImageBanner: Banner,
	ProductTiles: ProductTiles,
	ProductShelf: ProductShelf,
	CategoryShelf: CategoryShelf,
	CategoryTree: CategoryTree,
	CategoryTiles: CategoryTiles,
	LastSeenProducts: LastSeenProducts,
	CategoryListSwipe: CategoryListSwipe
}

const shouldReloadOnResume = componentName => {
	const componentsToReload = ['LastSeenProducts']
	return componentsToReload.includes(componentName)
}

export const getMappedComponent = (content, reloadKey) => {
	const Component = componentMap[content.name]

	if (!Component) {
		console.error(`Component ${content.name} does not exist in the component map.`)
		return null
	}

	const key = content.id + (shouldReloadOnResume(content.name) ? reloadKey : '')

	try {
		return (
			<Component
				key={key}
				data={content.data}
			/>
		)
	} catch (error) {
		console.error(`Error rendering component ${content.name}:`, error)
		return null
	}
}

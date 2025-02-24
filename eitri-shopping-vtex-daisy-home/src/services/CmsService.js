import { Vtex, App } from 'eitri-shopping-vtex-shared'
import { getFbRemoteConfig } from './RemoteConfigService'
import Eitri from 'eitri-bifrost'

export const getCmsContent = async (contentType, pageName) => {
	try {
		const { faststore } = Vtex.configs
		const cachedPage = await loadPageFromCache(faststore, contentType, pageName)

		if (cachedPage) {
			loadVtexCmsPage(faststore, contentType, pageName)
				.then(page => {
					if (page) {
						savePageInCache(faststore, contentType, pageName, page)
					}
				})
				.catch(e => {})

			return cachedPage
		}

		const page = await loadVtexCmsPage(faststore, contentType, pageName)
		if (page) {
			savePageInCache(faststore, contentType, pageName, page)
			return { sections: page.sections, settings: page.settings }
		} else {
			return null
		}
  } catch (e) {
		console.error('Error trying get content', e)
	}

	return null
}

export const loadVtexCmsPage = async (faststore, contentType, pageName) => {
	const result = await Vtex.cms.getPagesByContentTypes(faststore, contentType)
	const page = result.data.find(item => item.name?.toLowerCase() === pageName?.toLowerCase())
	return filterRemoteConfigContent(page)
}

export const loadPageFromCache = async (faststore, contentType, pageName) => {
	try {
		const cacheKey = `${faststore}_${contentType}_${pageName}`
		const content = await Eitri.sharedStorage.getItemJson(cacheKey)
		if (!content) return

		const inputDate = new Date(content.cachedIn)
		const currentDate = new Date()
		const differenceInMs = currentDate - inputDate
		const twentyFourHoursInMs = 86400000
		if (differenceInMs > twentyFourHoursInMs) {
			console.log('Cache expirado, buscando novo...')
			return null
		}
		return content
	} catch (error) {
		console.error('Error trying load from cache', error)
		return null
	}
}

export const savePageInCache = async (faststore, contentType, pageName, page) => {
	try {
		const cacheKey = `${faststore}_${contentType}_${pageName}`
		Eitri.sharedStorage.setItemJson(cacheKey, { cachedIn: new Date().toISOString(), ...page })
	} catch (error) {
		console.error('Error trying save in cache', error)
	}
}

export const filterRemoteConfigContent = async cmsPageContent => {
	if (!cmsPageContent) return null

	try {
		const remoteConfigKeys = extractRemoteConfigKeys(cmsPageContent)
		const remoteConfigMap = await fetchRemoteConfigs(remoteConfigKeys)

		return {
			...cmsPageContent,
			sections: filterSectionsByRemoteConfig(cmsPageContent.sections, remoteConfigMap)
		}
	} catch (error) {
		console.error('Error filtering remote config content:', error)
		return cmsPageContent
	}
}

const extractRemoteConfigKeys = cmsPageContent => {
	const keys = new Set()

	cmsPageContent.sections.forEach(section => {
		if (section.data?.remoteConfigKey) {
			keys.add(section.data.remoteConfigKey)
		}

		if (section.name === 'MultipleImageBanner') {
			section.data.images?.forEach(image => {
				if (image?.remoteConfigKey) {
					keys.add(image.remoteConfigKey)
				}
			})
		}
	})

	return Array.from(keys)
}

const fetchRemoteConfigs = async keys => {
	try {
		const results = await Promise.all(keys.map(getFbRemoteConfig))
		return results.reduce((acc, result, index) => {
			acc[keys[index]] = result ?? false
			return acc
		}, {})
	} catch (error) {
		console.error('Error fetching remote configs:', error)
		return {}
	}
}

const filterSectionsByRemoteConfig = (sections, remoteConfigMap) => {
	return sections.filter(section => {
		if (section.data?.remoteConfigKey && !remoteConfigMap[section.data.remoteConfigKey]) {
			return false
		}

		if (section.name === 'MultipleImageBanner') {
			section.data.images = section.data.images?.filter(
				image => !(image?.remoteConfigKey && !remoteConfigMap[image.remoteConfigKey])
			)
		}

		return true
	})
}

import Eitri from 'eitri-bifrost'

export const navigateToCheckout = orderFormId => {
	Eitri.nativeNavigation.open({
		slug: 'eitri-shopping-vtex-daisy-checkout',
		initParams: { orderFormId }
	})
}

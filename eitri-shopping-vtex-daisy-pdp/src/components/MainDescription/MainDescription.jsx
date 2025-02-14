import { Spacing } from 'eitri-shopping-vtex-daisy-shared'
import { formatAmount } from '../../utils/utils'
import { useTranslation } from 'eitri-i18n'
export default function MainDescription(props) {
  const { product, currentSku, locale, currency } = props
  const { t } = useTranslation()
  const discoverInstallments = (item) => {
    try {
      const mainSeller = item.sellers.find((seller) => seller.sellerDefault)
      if (mainSeller) {
        const betterInstallment = mainSeller.commertialOffer.Installments.reduce((acc, installment) => {
          if (!acc) {
            acc = installment
            return acc
          } else {
            if (installment.NumberOfInstallments > acc.NumberOfInstallments) {
              acc = installment
            }
            return acc
          }
        }, null)
        return `${t('mainDescription.txtUntil')} ${betterInstallment.NumberOfInstallments}x ${t('mainDescription.txtOf')} ${formatAmount(betterInstallment.Value, locale, currency)}`
      }
      return ''
    } catch (error) {
      return ''
    }
  }
  return (
    <View className="flex flex flex-col">
      <Spacing height="10px" />
      <Text className="text-lg font-bold">{currentSku?.nameComplete || currentSku?.name}</Text>
      {product?.productReference && (
        <>
          <Text className="text-neutral-content"> {`ref ${product?.productReference}`}</Text>
          <Spacing height="8px" />
        </>
      )}
      <Spacing height="8px" />
      {currentSku?.sellers[0]?.commertialOffer?.Price < currentSku?.sellers[0]?.commertialOffer?.ListPrice && (
        <Text className="text-sm text-neutral-content line-through font-bold">
          
          {formatAmount(currentSku?.sellers[0]?.commertialOffer?.ListPrice, locale, currency)}
        </Text>
      )}
      <Text className="text-primary-content font-bold">
        
        {formatAmount(currentSku?.sellers[0]?.commertialOffer?.Price, locale, currency)}
      </Text>
      <Spacing height="8px" />
      <Text className="text-sm text-neutral-content"> {discoverInstallments(currentSku)}</Text>
    </View>
  )
}

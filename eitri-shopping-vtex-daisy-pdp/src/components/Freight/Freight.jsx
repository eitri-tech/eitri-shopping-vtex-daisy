import Eitri from 'eitri-bifrost'
import { useTranslation } from 'eitri-i18n'
import fetchFreight from '../../services/freightService'
import { CustomButton, CustomInput } from 'eitri-shopping-vtex-daisy-shared'
export default function Freight(props) {
  const { currentSku } = props
  const { t } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)
  const [zipCode, setZipCode] = useState('')
  const [freightOptions, setFreightOptions] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    handleZipCode()
  }, [])
  const handleZipCode = async () => {
    const postalCodeStorage = await Eitri.sharedStorage.getItem('zipCode')
    if (postalCodeStorage) {
      setZipCode(postalCodeStorage)
      handleFreight(postalCodeStorage)
    }
  }
  const onInputZipCode = (value) => {
    setZipCode(value)
  }
  const handleFreight = async (zipCode) => {
    if (loading) return
    setLoading(true)
    try {
      let freightOpt = await fetchFreight(zipCode, currentSku)
      setFreightOptions(freightOpt)
      setZipCodeOnStorage(zipCode)
    } catch (error) {
      console.error('Error handleFreight', error)
    }
    setLoading(false)
  }
  const toggleCollapsedState = () => {
    setCollapsed(!collapsed)
  }
  const setZipCodeOnStorage = async (zipCode) => {
    await Eitri.sharedStorage.setItem('zipCode', zipCode)
  }
  return (
    <View>
      <View onClick={toggleCollapsedState}>
        <View width="100%" className="flex items-center justify-between">
          <Text className="text-lg font-bold">{t('freight.txtCalculate')}</Text>
          <View>{/* <Icon iconKey={collapsed ? 'chevron-down' : 'chevron-up'} width={26} /> */}</View>
        </View>
      </View>
      {!collapsed && (
        <View>
          <Text>{t('freight.txtCalculateDeadline')}</Text>
          <View width="100%" className="mt-2 flex justify-between items-center">
            <CustomInput
              placeholder={t('freight.labelZipCode')}
              value={zipCode}
              maxLength={9}
              mask="99999-999"
              inputMode="numeric"
              onChange={onInputZipCode}
              width="70%"
            />
            <CustomButton variant="outlined" width="30%" onClick={() => handleFreight(zipCode)} />
          </View>
          {loading && <View mode="skeleton" width="100%" height="100px" />}
          {
            !loading && freightOptions && freightOptions?.options?.length > 0 && (
              <View className="flex flex flex-col my-2 py-2 border border-neutral items-center justify-between">
                {freightOptions?.options.map((item, index) => (
                  <View key={index} width="100%" className="flex flex flex-col items-center">
                    <View width="100%" className="flex items-center justify-between px-2">
                      <Text className="font-bold">{item?.label}</Text>
                      <Text>{item?.price}</Text>
                    </View>
                    <View width="100%" className="flex items-center justify-between px-2">
                      <Text className="text-neutral-content">{item?.shippingEstimate}</Text>
                    </View>
                    {item.isPickupInPoint && (
                      <View width="100%" className="flex items-center px-2">
                        <Text className="text-neutral-content">{item.pickUpAddress}</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )
            // TODO: verificar qual vai ser o link de redirecionamento
            // <Touchable onPress={() => console.log("Não sei meu frete clicado")}>
            //     <Text color='secondary-300' textDecoration='underline'>Não sei meu cep</Text>
            // </Touchable>
          }
        </View>
      )}
    </View>
  )
}

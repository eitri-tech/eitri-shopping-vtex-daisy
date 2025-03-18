import { Spacing, Divisor } from 'eitri-shopping-vtex-daisy-shared'
import { useTranslation } from 'eitri-i18n'
export default function Supplier(props) {
  const { supplier } = props
  const [collapsed, setCollapsed] = useState(true)
  const { t } = useTranslation()
  const toggleCollapsedState = () => {
    setCollapsed(!collapsed)
  }
  return (
    <View>
      <View onClick={() => toggleCollapsedState()}>
        <View className="flex items-center justify-between w-full">
          <Text className="text-lg font-bold">{t('supplier.txtSupplier')}</Text>
          <View>{/* <Icon iconKey={collapsed ? 'chevron-down' : 'chevron-up'} width={26} /> */}</View>
        </View>
      </View>
      {!collapsed && (
        <View>
          <Text>{supplier}</Text>
          <Spacing height="20" />
        </View>
      )}
      <Divisor />
    </View>
  )
}

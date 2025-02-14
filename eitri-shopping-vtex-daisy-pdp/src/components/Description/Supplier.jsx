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
        <View width="100%" className="flex items-center justify-between">
          <Text className="text-lg font-bold">{t('supplier.txtSupplier')}</Text>
          <View>{/* <Icon iconKey={collapsed ? 'chevron-down' : 'chevron-up'} width={26} /> */}</View>
        </View>
      </View>
      {!collapsed && (
        <View>
          <Text>{supplier}</Text>
          <Spacing height="20px" />
        </View>
      )}
      <Divisor />
    </View>
  )
}

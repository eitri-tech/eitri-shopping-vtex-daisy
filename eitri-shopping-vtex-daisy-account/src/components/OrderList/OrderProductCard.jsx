import { formatAmountInCents } from '../../utils/utils'
import OrderListButton from './OrderListButton'
import ImageCard from '../Image/ImageCard'
export default function OrderProductCard(props) {
  const { delivery, productItems, labelDelivery, labelShowAll, labelHideAll } = props
  const [products, setProducts] = useState(productItems)
  const [showAllItems, setShowAllItems] = useState(false)
  useEffect(() => {
    handleLoadProducts()
  }, [])
  const handleLoadProducts = () => {
    if (!showAllItems) {
      setProducts(productItems.slice(0, 3))
    } else {
      setProducts(productItems)
    }
  }
  const toggleShowAllItems = () => {
    if (!showAllItems) {
      setProducts(productItems)
    } else {
      setProducts(productItems.slice(0, 3))
    }
    setShowAllItems((prev) => !prev)
  }
  return (
    <View className="relative flex flex-col gap-2">
      {products &&
        products.map((item, key) => (
          <View
            borderTopWidth={key > 0 ? 'hairline' : 'none'}
            key={item.uniqueId}
            className="border-neutral-content flex flex-row bg-neutral aling-center gap-4 p-2"
          >
            <ImageCard imageUrl={item.imageUrl} />
            <View className=" flex flex flex-col gap-1">
              <View className="flex flex-col justify-between">
                <View id={item.id}>
                  <Text textOverflow="ellipsis" whiteSpace="wrap" lineHeight="medium" className="text-primary-content text-sm">
                    {item.name}
                  </Text>
                </View>
              </View>
              <View className="flex flex flex-row justify-between">
                <Text className="block w-full text-xs">{`${item.quantity} un ${formatAmountInCents(item.price)}`}</Text>
                {delivery && <Text className="font-bold text-xs w-full">{`${labelDelivery || 'Entrega até'} ${delivery}`}</Text>}
              </View>
            </View>
          </View>
        ))}
      {productItems.length > 3 && (
        <View className="mt-2">
          <OrderListButton
            onClick={() => toggleShowAllItems()}
            className="border-info-content bg-info-content text-primary-content"
            label={!showAllItems ? labelShowAll || 'Ver todos os itens' : labelHideAll || 'Ver Menos'}
          />
        </View>
      )}
    </View>
  )
}

import Eitri from 'eitri-bifrost'
import OrderStatusBadge from './OrderStatusBadge'
export default function OrderListDetails(props) {
  const {
    creationDate,
    totalItems,
    totalValue,
    statusId,
    statusDescription,
    order,
    labelOrderDate,
    labelTotal,
    labelOrderNumber,
  } = props
  const [colorButtonCopy, setColorButtonCopy] = useState('neutral-900')
  const copyOrderNumber = async (orderNumber) => {
    await Eitri.clipboard.setText({
      text: orderNumber,
    })
    setColorButtonCopy('positive-700')
  }
  return (
    <View borderBottomWidth="hairline" className="p-2 justify-between flex flex flex-col border-neutral">
      <View width="100%" className="flex flex flex-row">
        <View align="left" width="100%" className="flex flex flex-col">
          <Text className="block w-full font-bold text-sm">{labelOrderDate || 'Data do Pedido'}</Text>
          <Text className="block w-full mb-2 text-xs">{creationDate}</Text>
        </View>
        <View align="left" width="100%" className="flex flex flex-col">
          <Text className="block w-full text-right font-bold text-sm">{labelTotal || 'Total'}</Text>
          <Text className="block w-full text-right text-xs">{totalValue}</Text>
        </View>
      </View>
      <View className="flex flex flex-row items-center">
        <View className="pr-1">
          <Text className="block w-full font-bold text-sm">{labelOrderNumber || 'Número do Pedido'}</Text>
          <Text whiteSpace="nowrap" className="block w-full text-xs">
            {order}
          </Text>
        </View>
        <View onClick={() => copyOrderNumber(order)}>
          <View>{/* <Icon iconKey="clipboard" color={colorButtonCopy} width={25} /> */}</View>
        </View>
      </View>
      <View className="flex flex flex-row items-center justify-between">
        <Text className="text-sm"> {`${totalItems} ${totalItems > 1 ? 'Itens' : 'Item'}`}</Text>
        <OrderStatusBadge statusId={statusId} statusDescription={statusDescription} />
      </View>
    </View>
  )
}

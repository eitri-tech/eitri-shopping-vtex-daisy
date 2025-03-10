import { Vtex } from 'eitri-shopping-vtex-shared'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-daisy-shared'
import formatDate, { formatDateDaysMonthYear } from '../utils/Date'
import OrderStatusBadge from '../components/OrderList/OrderStatusBadge'
import OrderProductCard from '../components/OrderList/OrderProductCard'
import Eitri from 'eitri-bifrost'
import ProtectedView from '../components/ProtectedView/ProtectedView'
import { sendPageView } from '../services/TrackingService'
export default function OrderDetails(props) {
  const [order, setOrders] = useState(props?.history?.location?.state?.orderId)
  const [adress, setAdress] = useState('')
  const [products, setProducts] = useState('')
  const [orderSumary, setOrderSumary] = useState('')
  const [paymentDetails, setPaymentDetails] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [cancelConfirmation, setCancelConfirmation] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  //const orderList = Vtex.customer.listOrders(0);
  useEffect(() => {
    try {
      const orderId = props?.history?.location?.state?.orderId
      if (!orderId) {
        Eitri.navigation.navigate({
          path: 'OrderList',
          replace: true,
        })
      }
      handleOrder(orderId)
      sendPageView('Detalhes do pedido')
    } catch (error) {
      console.log('deu erro', error)
    }
  }, [])
  const formatAmountInCents = (amount) => {
    if (typeof amount !== 'number') {
      return ''
    }
    if (amount === 0) {
      return 'Grátis'
    }
    return (amount / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })
  }
  const handleOrder = async (id) => {
    try {
      const orders = await Vtex.customer.getOrderById(id)
      setOrders(orders)
      setProducts(orders.items)
      setAdress(orders.shippingData.address)
      setPaymentDetails(orders.paymentData.transactions[0].payments[0])
      setOrderSumary(orders.totals)
      setIsLoading(false)
    } catch (error) {
      console.log('Erro ao pegar orders', error)
      Eitri.navigation.navigate({
        path: 'OrderList',
        replace: true,
      })
    }
  }
  const cancelOrder = async () => {
    try {
      setIsLoading(true)
      if (!cancelReason) {
        return
      }
      const payload = {
        reason: cancelReason,
      }
      await Vtex.customer.cancelOrder(order.orderId, payload)
      Eitri.navigation.back()
    } catch (e) {
      console.log('Erro ao cancelar pedido', e)
    }
  }
  const getFormattedPaymentSystem = (payment) => {
    if (!payment) return null
    if (payment.paymentSystem === '6') {
      return (
        <View width="100%" className="flex justify-between align-center">
          <Text className="block w-full  text-xs">{payment.paymentSystemName} </Text>
          {order.status === 'payment-pending' && (
            <View
              className="text-nowrap"
              onClick={() =>
                Eitri.openBrowser({
                  url: payment.url,
                })
              }
            >
              <Text className=" text-sky-600 font-bold text-sm text-nowrap">Ver boleto</Text>
            </View>
          )}
        </View>
      )
    }
    return (
      <Text>{`${payment.paymentSystemName} ${formatAmountInCents(payment.value)} (${payment.installments}x)`}</Text>
    )
  }
  const handleShippingEstimate = (shippingEstimate) => {
    return shippingEstimate.replace(/[a-zA-Z]/g, '')
  }
  return (
    <ProtectedView
      afterLoginRedirectTo={'OrderDetails'}
      redirectState={{
        orderId: props?.history?.location?.state?.orderId,
      }}
    >
      <Page bottomInset topInset>
        <View className="px-8 pt-12">
          <BigTitle title='Meus Pedidos' withBackAction />
        </View>
        <View>
          {isLoading ? (
            <Loading fullScreen />
          ) : (
            <View className="px-8 py-12">
              <View justify="center" align="left" className="mt-4 border border-neutral-300 rounded-md">
                <View className="flex flex-col p-2">
                  <View className="flex flex flex-row items-center justify-between">
                    <View className="flex flex-col">
                      <Text className="block w-full text-sm font-bold">{order.orderId}</Text>
                      <Text className="block w-full text-xs">{order.orderId}</Text>
                    </View>
                    <OrderStatusBadge statusId={order.status} statusDescription={order.statusDescription} />
                  </View>
                  <View className="flex flex-col">
                    <Text className="block w-full text-sm font-bold">Data do pedido:</Text>
                    <Text className="block w-full text-xs">{formatDateDaysMonthYear(order.creationDate)}</Text>
                  </View>
                  <View className="flex flex-col">
                    <Text className="block w-full text-sm font-bold">Endereço</Text>
                    <View>
                      <Text className="block w-full text-xs">{adress.receiverName}</Text>
                      <View className="flex flex-col flex">
                        <Text className="block w-full text-xs">
                          {`${adress.street}, ${adress.number} ${adress.complement ? ' - ' + adress.complement : ''}`}
                        </Text>
                        <Text className="block w-full text-xs">
                          {`${adress.city} - ${adress.state} - ${adress.neighborhood} - ${adress.postalCode}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View width="100%" className="flex flex-col">
                    <Text className="text-sm font-bold">Forma de pagamento</Text>
                    <View className="flex text-xs">
                      {order?.paymentData?.transactions[0]?.payments?.map((payment) =>
                        getFormattedPaymentSystem(payment),
                      )}
                    </View>
                  </View>
                  <View width="100%" className="flex flex-col">
                    <Text className="text-sm font-bold">Entrega</Text>
                    <View className="flex">
                      {order?.shippingData?.logisticsInfo[0]?.shippingEstimateDate ? (
                        <Text className="block w-full text-xs">{`Entrega até ${formatDate(order?.shippingData?.logisticsInfo[0]?.shippingEstimateDate)}`}</Text>
                      ) : (
                        <Text className="block w-full text-xs">{`Prazo de ${handleShippingEstimate(order?.shippingData?.logisticsInfo[0]?.shippingEstimate)} dias úteis após aprovação do pagamento`}</Text>
                      )}
                    </View>
                  </View>
                  <View className="flex flex-col">
                    <Text className="block w-full text-sm font-bold">Resumo</Text>
                    <View className="flex flex-col">
                      {order &&
                        order?.totals?.map((total) => (
                          <>
                            {total.value > 0 && (
                              <Text className="block w-full text-xs">{`${total?.name}: ${formatAmountInCents(total.value)}`}</Text>
                            )}
                          </>
                        ))}
                      <Text className="block w-full text-xs">
                        {`Total: ${orderSumary && formatAmountInCents(orderSumary.map((item) => item.value).reduce((acc, curr) => acc + curr, 0))}`}
                      </Text>
                    </View>
                  </View>
                  {order?.allowCancellation && (
                    <View width="100%" className="flex items-center">
                      {cancelConfirmation ? (
                        <View>
                          <Text className="block w-full text-sm font-bold font-bold">Selecione o motivo para o cancelamento</Text>
                          <Dropdown
                            value={cancelReason}
                            placeholder="Selecione o motivo"
                            onChange={(value) => setCancelReason(value)}
                          >
                            <Dropdown.Button className="flex items-center">
                              <Text className=" text-sm font-bold">
                                {cancelReason == '' ? "Selecione o motivo" : cancelReason} 
                              </Text>
                              <Image src={arrowRight} className="w-[16px] h-[16px]" />
                            </Dropdown.Button>
                            <Dropdown.Items>
                              <Dropdown.Item value="Não quero mais este produto.">
                                <Text>
                                Não quero mais este produto.
                                </Text>
                              </Dropdown.Item>
                              <Dropdown.Item value="Comprei sem querer." >
                                <Text>
                                Comprei sem querer.
                                </Text>
                              </Dropdown.Item>
                              <Dropdown.Item value="A entrega vai demorar demais." >
                                <Text>
                                A entrega vai demorar demais.
                                </Text>
                              </Dropdown.Item>
                              <Dropdown.Item value="Encontrei um preço melhor em outro lugar.">
                                <Text>
                                Encontrei um preço melhor em outro lugar.
                                </Text>
                              </Dropdown.Item>
                              <Dropdown.Item value="Prefiro não informar." >
                                <Text>
                                Prefiro não informar.
                                </Text>
                              </Dropdown.Item>
                              <Dropdown.Item value="Outro" >
                                <Text>
                                Outro
                                </Text>
                              </Dropdown.Item>
                            </Dropdown.Items>
                          </Dropdown>
                          <View className="flex justify-between mt-2">
                            <View onClick={() => setCancelConfirmation(false)}>
                              <Text className="block w-full text-primary-content text-xs font-bold">Voltar</Text>
                            </View>
                            <View onClick={cancelOrder}>
                              <Text
                                color={cancelReason ? 'negative-700' : ''}
                                className="block w-full text-xs font-bold"
                              >
                                Continuar cancelamento
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View onClick={() => setCancelConfirmation(true)}>
                          <Text className="block w-full text-error-content font-bold">Cancelar pedido</Text>
                        </View>
                      )}
                    </View>
                  )}
                </View>
                <View
                  borderTopWidth="hairline"
                  borderRadiusRightBottom="medium"
                  borderRadiusLeftBottom="medium"
                  className="bg-neutral border-neutral-content p-1"
                >
                  {products && (
                    <OrderProductCard
                      orderId={order.orderId}
                      productItems={products}
                      key="id"
                      delivery={order.ShippingEstimatedDateMax && formatDate(order.ShippingEstimatedDateMax)}
                    />
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      </Page>
    </ProtectedView>
  )
}

import { getWishlist, removeFromWishlist } from '../services/CustomerService'
import WishlistItem from '../components/WishlistItem/WishlistItem'
import { HEADER_TYPE, HeaderTemplate, Loading } from 'eitri-shopping-vtex-daisy-shared'
import NoItem from '../components/NoItem/NoItem'
import { sendPageView } from '../services/TrackingService'
export default function Wishlist(props) {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    start()
    sendPageView('Lista de desejos')
  }, [])
  const start = async () => {
    setIsLoading(true)
    const result = await getWishlist().catch((e) => {
      console.log('Error:', e)
      return []
    })
    setWishlistItems(result)
    setIsLoading(false)
  }
  const onRemoveFromWishList = async (id) => {
    try {
      setIsLoading(true)
      await removeFromWishlist(id)
      const filtered = wishlistItems.filter((item) => item.id !== id)
      setWishlistItems(filtered)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <Page bottomInset topInset>
      <HeaderTemplate headerType={HEADER_TYPE.RETURN_AND_TEXT} viewBackButton={true} contentText={'Meus favoritos'} />
      <Loading isLoading={isLoading} fullScreen />
      <View className="py-8 flex flex-col">
        {wishlistItems?.map(
          (item, index) =>
            index % 2 === 0 && (
              <View key={item.id} className="flex">
                <View width="50%" className="pr-1 pl-8">
                  <WishlistItem
                    productId={wishlistItems[index].productId}
                    onRemoveFromWishlist={() => onRemoveFromWishList(wishlistItems[index].id)}
                  />
                </View>
                {wishlistItems[index + 1] && (
                  <View width="50%" className="pl-1 pr-8">
                    <WishlistItem
                      productId={wishlistItems[index + 1].productId}
                      onRemoveFromWishlist={() => onRemoveFromWishList(wishlistItems[index + 1].id)}
                    />
                  </View>
                )}
              </View>
            ),
        )}
      </View>
      {wishlistItems.length === 0 && !isLoading && (
        <NoItem
          title="Você não possui nenhum item salvo"
          subtitle="Quando você salvar um produto, ele será listado aqui."
        />
      )}
    </Page>
  )
}

import { HeaderReturn } from 'eitri-shopping-vtex-daisy-shared'
export default function CategoryPageItem(props) {
  const { item, goToItem } = props
  const [headerHeight, setHeaderHeight] = useState(0)
  useEffect(() => {
    loadHeaderHeight()
  }, [])
  const loadHeaderHeight = () => {
    const element = document.getElementById('mini-header')
    const headerHeight = element.offsetHeight
    setHeaderHeight(headerHeight)
  }
  const [showSubItems, setShowSubItems] = useState(false)
  return (
    <>
      <View onClick={() => setShowSubItems(true)} className="p-8 flex justify-between items-center">
        <Text className="font-bold">{item.title}</Text>
        <Icon iconKey="chevron-right" width={14} height={14} />
      </View>
      <View
        width="100vw"
        position={showSubItems ? 'absolute' : 'fixed'}
        left={showSubItems ? '0' : '100vw'}
        transition="left 0.2s linear"
        className="top-0 z-9999"
      >
        <View>
          <View left={showSubItems ? '0' : '100vw'} className="fixed top-0 right-0 bg-base-100">
            <View topInset className="bg-primary-content" />
            <View
              id="mini-header"
              width={'100vw'}
              className="px-8 flex items-center justify-between bg-primary-content"
            >
              <View className="flex items-center">
                <HeaderReturn onClick={() => setShowSubItems(false)} />
                <Text contentColor className="text-primary-content">
                  {item.title}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View minHeight="100vh" className="bg-base-100">
          <View topInset />
          <View height={headerHeight} width="100%" />
          <View className="flex flex-col p-8">
            {item?.subcategories?.map((subItem, index) => (
              <View onClick={() => goToItem(subItem)} className="p-8 flex justify-between items-center">
                <Text className="font-bold">{subItem.title}</Text>
                <Icon iconKey="chevron-right" width={14} height={14} />
              </View>
            ))}
          </View>
          <View bottomInset />
        </View>
      </View>
    </>
  )
}

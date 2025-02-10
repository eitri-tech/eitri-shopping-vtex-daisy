import HeaderCart from './HeaderCart'
import Eitri from 'eitri-bifrost'
export default function HeaderComponent(props) {
  const {
    backgroundColor,
    contentColor,
    children,
    display,
    alignItems,
    justifyContent,
    paddingVertical,
    paddingHorizontal,
    showSearchBar,
    quantityOfItems,
    navigateToSearch,
    onPressCartSearchBar,
    scrollEffect = false,
    iconCartColor,
    filterOptions,
  } = props
  const [safeAreaTop, setSafeAreaTop] = useState(0)
  const [translate, setTranslate] = useState('')
  const safeAreaTopRef = useRef()
  safeAreaTopRef.current = safeAreaTop
  let minHeight = 60
  useEffect(() => {
    loadSafeAreas()
    window.addEventListener('scroll', scrollDetect)
    return () => {
      window.removeEventListener('scroll', scrollDetect)
    }
  }, [])
  const loadSafeAreas = async () => {
    const { EITRI } = window
    if (EITRI) {
      const { superAppData } = await EITRI.miniAppConfigs
      const { safeAreaInsets } = superAppData
      const { top } = safeAreaInsets
      setSafeAreaTop(top)
    }
  }
  let ticking = false
  let lastScrollTop = window.document.documentElement.scrollTop
  let scrollDetect = () => {
    if (!ticking && scrollEffect) {
      window.requestAnimationFrame(() => {
        let currentScrollTop = window.document.documentElement.scrollTop
        if (currentScrollTop > lastScrollTop) {
          setTranslate(`translateY(-100%)`)
        } else if (currentScrollTop < lastScrollTop) {
          setTranslate('')
        }
        lastScrollTop = Math.max(currentScrollTop, 0)
        ticking = false
      })
      ticking = true
    }
  }
  if (!backgroundColor) {
    return null
  }
  return (
    <>
      <View
        backgroundColor={backgroundColor}
        id="header-container"
        transform={translate || ''}
        transition="all 0.3s"
        className="fixed top-0 left-0 right-0 z-999"
      >
        <View topInset />
        <View id="header">
          <View
            id="header-content"
            width="100vw"
            paddingVertical={paddingVertical || 'extra-small'}
            paddingHorizontal={paddingHorizontal || 'large'}
            display={display || 'flex'}
            alignItems={alignItems || 'center'}
            justifyContent={justifyContent || 'between'}
            minHeight={minHeight}
            backgroundColor={backgroundColor}
          >
            {children}
          </View>
          {showSearchBar && (
            <View width="100%" className="flex bg-neutral p-8 items-center">
              <View onClick={navigateToSearch} className="grow-1">
                <View maxHeight="40px" width="100%" className="bg-base-100 border-neutral flex py-2 pl-8 items-center">
                  <Icon width={16} height={16} color={contentColor || 'support-01'} iconKey="search" />
                  <Text fontFamily="Baloo2" className="text-neutral-content font-bold">
                    Procurar...
                  </Text>
                </View>
              </View>
              <View id="cart-icon" width={0} className="opacity-0 justify-end flex">
                <HeaderCart
                  iconColor={iconCartColor}
                  quantityOfItems={quantityOfItems}
                  onClick={onPressCartSearchBar}
                />
              </View>
            </View>
          )}
        </View>
      </View>
      <View topInset width="100%" backgroundColor={backgroundColor} className="fixed top-0 z-2000" />
      <View height={minHeight} />
    </>
  )
}

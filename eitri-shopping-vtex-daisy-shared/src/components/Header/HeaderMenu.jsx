export default function HeaderMenu(props) {
  const { iconColor, content, showDrawer, onCloseDrawer, onPressOpenButton } = props
  const [initialTransparency, setInitialTransparency] = useState('transparent')
  // Pra tratar o flicker do drawer
  useEffect(() => {
    setTimeout(() => {
      setInitialTransparency('solid')
    }, 2000)
  }, [])
  return (
    <>
      <View onClick={onPressOpenButton}>
        <Icon width={24} height={24} color={iconColor || 'neutral-900'} iconKey="menu" />
      </View>
      <>
        {showDrawer && <View onClick={onCloseDrawer} customColor="#000000" className="fixed z-998" />}
        <View
          id={'drawer-content'}
          width="80vw"
          height="100vh"
          minHeight="100vh"
          maxHeight="100vh"
          customColor="#ffffff"
          borderRadiusRightTop="medium"
          borderRadiusRightBottom="medium"
          opacity={initialTransparency}
          left={showDrawer ? '0' : '-80vw'}
          className="absolute top-0 z-999"
        >
          <View>
            <View topInset />
            {content}
            <View bottomInset />
          </View>
        </View>
      </>
    </>
  )
}

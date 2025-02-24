export default function Alert(props) {
  const { message, type, position, duration, onDismiss, show } = props
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (!show) {
      return
    }
    setVisible(true)
    const timer = setTimeout(() => {
      setVisible(false)
      if (typeof onDismiss === 'function') {
        onDismiss()
      }
    }, duration * 1000)
    return () => clearTimeout(timer)
  }, [duration, show])
  if (!visible || !show) {
    return null
  }
  return (
    <View className="fixed w-full">
      <View className="w-full flex justify-center p-2">
        <Text className={`block w-full font-bold text-${type || 'negative'}-700`}>
          {message}
        </Text>
      </View>
      <View bottomInset />
    </View>

  )
}

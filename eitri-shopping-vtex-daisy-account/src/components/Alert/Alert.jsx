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
    <View className="fixed w-full bottom-0 px-4 py-6">
			<View className="w-full flex justify-center p-2 border border-red-500 bg-red-100 rounded-md">
				<Text className={`block font-bold text-${type || 'negative'}-700 text-red-500`}>
				{message}
				</Text>
			</View> 
			<View bottomInset/>
		</View>
  )
}

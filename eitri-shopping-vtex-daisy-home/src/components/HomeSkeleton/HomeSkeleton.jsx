export default function HomeSkeleton(props) {
  const { show } = props
  return (
    <View display={show ? 'block' : 'none'} className="p-8">
      <View className="flex flex-col">
        <View mode="skeleton" width="100%" height="100vw" />
        <View className="flex flex-row">
          <View mode="skeleton" width="100%" height={80} />
          <View mode="skeleton" width="100%" height={80} />
          <View mode="skeleton" width="100%" height={80} />
        </View>
        <View mode="skeleton" width="100%" height="100vw" />
      </View>
    </View>
  )
}

export default function HeaderSearch(props) {
  const { onPress, labelSearch } = props
  return (
    <View width="100%" onClick={onPress}>
      <View maxHeight="40px" width="100%" className="bg-neutral border-neutral border flex py-2 pl-8 items-center">
        <Icon width={16} height={16} iconKey="search" />
        <Text fontFamily="Baloo2" className="text-neutral-content font-bold">
          {labelSearch || 'Procurar...'}
        </Text>
      </View>
    </View>
  )
}

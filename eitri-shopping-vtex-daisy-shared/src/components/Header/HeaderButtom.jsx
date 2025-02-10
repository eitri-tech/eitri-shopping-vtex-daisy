export default function HeaderButtom(props) {
  const { iconColor, onPress, iconKey } = props
  return (
    <View onClick={onPress}>
      <Icon width={24} height={24} color={iconColor || 'neutral-900'} iconKey={iconKey} />
    </View>
  )
}

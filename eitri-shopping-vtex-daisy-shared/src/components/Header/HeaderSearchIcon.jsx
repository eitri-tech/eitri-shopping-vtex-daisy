export default function HeaderSearchIcon(props) {
  const { navigateToSearch, iconColor } = props
  return (
    <View onClick={navigateToSearch}>
      <Icon color={iconColor} iconKey="search" width={24} height={24} />
    </View>
  )
}

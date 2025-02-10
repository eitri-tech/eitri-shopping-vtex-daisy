export default function HeaderLogo(props) {
  const { src, height } = props
  return (
    <View height="100%" className="flex items-center">
      <Image src={src} height={height || 50} />
    </View>
  )
}

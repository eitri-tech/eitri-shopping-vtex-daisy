export default function ImageCard(props) {
  const { imageUrl } = props
  return (
    <View
      minWidth={'48px'}
      maxWidth={'48px'}
      minHeight={'48px'}
      maxHeight={'48px'}
      className="flex justify-center items-center"
    >
      <Image src={imageUrl} maxWidth="100%" maxHeight={'100%'} />
    </View>
  )
}

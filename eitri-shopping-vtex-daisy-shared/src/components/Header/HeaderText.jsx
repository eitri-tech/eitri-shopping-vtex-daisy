export default function HeaderText(props) {
  const { text, contentColor } = props
  return (
    <View width={'100%'} className="flex justify-center">
      <Text color={contentColor} className="font-bold">
        {text}
      </Text>
    </View>
  )
}

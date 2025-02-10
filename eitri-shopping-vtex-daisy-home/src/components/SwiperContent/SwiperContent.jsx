export default function SwiperContent(props) {
  const { title, children, marginBottom, paddingHorizontal, gap } = props
  return (
    <View marginBottom={marginBottom || ''}>
      {title && (
        <View paddingHorizontal={paddingHorizontal || 'large'}>
          <Text className="font-bold">{title}</Text>
        </View>
      )}
      <Stack scrollSnapType="x mandatory" className="flex flex-row overflow-x-scroll">
        {paddingHorizontal && (
          <View marginLeft={paddingHorizontal} height="1px">
            &nbsp;
          </View>
        )}
        <View gap={gap ? gap : '8px'} minHeight="72px" className="flex flex-row">
          {children}
        </View>
        {paddingHorizontal && (
          <View marginRight={paddingHorizontal} height="1px">
            &nbsp;
          </View>
        )}
      </Stack>
    </View>
  )
}

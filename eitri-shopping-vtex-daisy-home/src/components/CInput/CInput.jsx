import {View, Image} from "eitri-luminus";
export default function CInput(props) {
  const { icon, type, backgroundColor, mask, ...rest } = props
  return (
    <View
      backgroundColor={backgroundColor || 'neutral-100'}
      height="40px"
      width="100%"
      className="border-neutral border flex items-center text-neutral-content px-8"
    >
      {icon && (
        <View>
          <Image src={icon} width="16px" />
        </View>
      )}
      {mask ? <TextInput mask={mask} /> : <TextInput type={type || 'text'} />}
    </View>
  )
}

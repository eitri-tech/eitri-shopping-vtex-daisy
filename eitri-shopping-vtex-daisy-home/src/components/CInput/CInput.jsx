import {View, TextInput} from "eitri-luminus";
export default function CInput(props) {
  const { icon, type, backgroundColor, mask, onChange, ...rest } = props
  return (
    <View
      // backgroundColor={backgroundColor || 'neutral-100'}
      // height="40px"
      // width="100%"
      className=" flex items-center text-neutral-content px-8 w-full h-[40px]"
    >
      {/* {icon && (
        <View>
          <Image src={icon} width="16px" />
        </View>
      )} */}
     <TextInput onChange={onChange} className="input-bordered" iconInsideLeft={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="#000"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
          } type={type || 'search'}  placeholder="Encontre seu produto.."/>
          
    </View>
  )
}

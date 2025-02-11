import eyeOn from '../../assets/images/eye-on.svg'
import eyeOff from '../../assets/images/eye-off.svg'

export default function CustomInput(props) {
	const { icon, type, backgroundColor, mask, width, label, height, ...rest } = props

	const [showPassword, setShowPassword] = useState(false)

	return (
		<View width={width || '100%'}>
			{label && (
				<View marginBottom='nano'>
					<Text
						fontSize='extra-small'
						fontWeight={'bold'}>
						{label}
					</Text>
				</View>
			)}
			<View
				backgroundColor={backgroundColor || 'neutral-100'}
				borderColor='neutral-300'
				borderWidth='hairline'
				height={height || '48px'}
				display='flex'
				alignItems='center'
				color='neutral-500'
				paddingHorizontal='small'
				width='100%'
				borderRadius='small'>
				{icon && (
					<View>
						<Image src={icon} />
					</View>
				)}
				{mask ? (
					<TextInput
						width='100%'
						{...rest}
					/>
				) : (
					<TextInput
						borderHidden={true}
						type={showPassword ? 'text' : type || 'text'}
						width='100%'
						{...rest}
					/>
				)}
				{type === 'password' && (
					<View>
						<Image src={showPassword ? eyeOn : eyeOff} />
					</View>
				)}
			</View>
		</View>
	)
}

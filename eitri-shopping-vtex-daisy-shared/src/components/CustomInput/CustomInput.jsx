import eyeOn from '../../assets/images/eye-on.svg'
import eyeOff from '../../assets/images/eye-off.svg'

export default function CustomInput(props) {
	const { icon, type, backgroundColor, mask, width, label, height, ...rest } = props

	const [showPassword, setShowPassword] = useState(false)

	return (
		<View className={`${width ? `w-[${width}]` : "w-full"}`}>
			{label && (
				<View className="mb-1">
				<Text className="text-xs font-bold">{label}</Text>
				</View>
			)}
			<View
				className={`bg-${backgroundColor || "neutral-100"} border border-neutral-300 h-${height || "12"} flex items-center text-neutral-500 px-2 w-full rounded-full`}
			>
				{icon && (
				<View>
					<Image src={icon} />
				</View>
				)}
				{mask ? (
				<TextInput className="w-full" {...rest} />
				) : (
				<TextInput
					className="w-full border-none bg-neutral-100 rounded-full"
					type={showPassword ? "text" : type || "text"}
					{...rest}
				/>
				)}
				{type === "password" && (
				<View>
					<Image src={showPassword ? eyeOn : eyeOff} />
				</View>
				)}
			</View>
		</View>
	)
}

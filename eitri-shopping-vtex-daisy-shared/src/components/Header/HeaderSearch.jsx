export default function HeaderSearch(props) {
	const { onPress, labelSearch } = props

	return (
		<View
			width='100%'
		>
			<View
				borderRadius='pill'
				backgroundColor='neutral-100'
				borderColor='neutral-300'
				borderWidth='hairline'
				display='flex'
				paddingVertical='small'
				paddingLeft='large'
				maxHeight='40px'
				alignItems='center'
				width='100%'>
				<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
				<Text
					marginLeft='extra-small'
					color='neutral-500'
					fontFamily='Baloo2'
					fontSize='extra-small'
					fontWeight='bold'>
					{labelSearch || 'Procurar...'}
				</Text>
			</View>
		</View>
	)
}

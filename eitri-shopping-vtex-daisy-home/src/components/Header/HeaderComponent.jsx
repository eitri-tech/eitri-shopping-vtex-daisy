import HeaderCart from './HeaderCart'
import Eitri from 'eitri-bifrost'

export default function HeaderComponent(props) {
	const {
		backgroundColor,
		contentColor,
		children,
		display,
		alignItems,
		justifyContent,
		paddingVertical,
		paddingHorizontal,
		showSearchBar,
		quantityOfItems,
		navigateToSearch,
		onPressCartSearchBar,
		scrollEffect = false,
		iconCartColor,
		filterOptions
	} = props

	const [safeAreaTop, setSafeAreaTop] = useState(0)

	const [translate, setTranslate] = useState('')

	const safeAreaTopRef = useRef()

	safeAreaTopRef.current = safeAreaTop

	let minHeight = 60

	useEffect(() => {
		loadSafeAreas()

		window.addEventListener('scroll', scrollDetect)
		return () => {
			window.removeEventListener('scroll', scrollDetect)
		}
	}, [])

	const loadSafeAreas = async () => {
		// console.warn("loadSafeAreas", window)
		const { EITRI } = window
		// console.warn("loadSafeAreas", EITRI)
		if (EITRI) {
			const { superAppData } = await EITRI.miniAppConfigs
			console.warn("loadSafeAreas", superAppData)
			const { safeAreaInsets } = superAppData
			const { top } = safeAreaInsets
			setSafeAreaTop(top)
		}
	}

	let ticking = false
	let lastScrollTop = window.document.documentElement.scrollTop

	let scrollDetect = () => {
		console.log("scrollDetect")
		if (!ticking && scrollEffect) {
			window.requestAnimationFrame(() => {
				let currentScrollTop = window.document.documentElement.scrollTop

				if (currentScrollTop > lastScrollTop) {
					console.info("scrollDetect set transform")
					setTranslate(`transform translate-y-[-100%]`)
				} else if (currentScrollTop < lastScrollTop) {
					setTranslate('')
				}

				lastScrollTop = Math.max(currentScrollTop, 0)

				ticking = false
			})

			ticking = true
		}
	}

	if (!backgroundColor) {
		return null
	}

	return (
		<>
			<View
				// backgroundColor={backgroundColor}
				// id='header-container'
				// position={'fixed'}
				// transform={translate || ''}
				// transition='all 0.3s'
				// top={0}
				// left={0}
				// right={0}
				// zIndex='999'

				className={`fixed top-0 left-0 right-0 z-[999] mt-[30px] transition-all duration-300 ${translate}`}
				id="header-container"
			>
				<View className="pt-[40px]"/>
				<View id='header'>
					<View
						id='header-content'
						// gap='24px'
						// width='100vw'
						// paddingRight='extra-large'
						// paddingVertical={paddingVertical || 'extra-small'}
						// paddingHorizontal={paddingHorizontal || 'large'}
						// display={display || 'flex'}
						// alignItems={alignItems || 'center'}
						// justifyContent={justifyContent || 'between'}
						// minHeight={minHeight}
						// backgroundColor={backgroundColor}
						// pr-8 py-1 px-6
						className={`${backgroundColor} pr-2 py-1 px-4 w-screen flex items-center justify-between ${minHeight ? `min-h-[${minHeight}px]` : ''} gap-6`}
						>
						{children}
					</View>
					{showSearchBar && (
						<View
							// display='flex'
							// backgroundColor='neutral-100'
							// padding='large'
							// width='100%'
							// alignItems='center'
							className="flex bg-neutral-100 p-6 w-full items-center">
							<View
								// grow={1}
								className="flex-grow"
								>
								<View
									// borderRadius='pill'
									// backgroundColor='background-color'
									// borderColor='neutral-300'
									// display='flex'
									// paddingVertical='small'
									// paddingLeft='large'
									// maxHeight='40px'
									// alignItems='center'
									// width='100%'
									className={`flex bg-[background-color] border border-neutral-300 rounded-full py-2 pl-6 max-h-[40px] items-center w-full`}
									>
									<svg className="h-full w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
									<Text
										// marginLeft='extra-small'
										// color='neutral-500'
										// fontFamily='Baloo2'
										// fontSize='extra-small'
										// fontWeight='bold'
										className="ml-1 text-neutral-500 font-[Baloo2] text-xs font-bold"
										>
										Procurar...
									</Text>
								</View>
							</View>
							<View
								id='cart-icon'
								// opacity='none'
								// justifyContent='end'
								// display='flex'
								// width={0}
								className="opacity-0 justify-end flex w-0"
								>
								<HeaderCart
									iconColor={iconCartColor}
									quantityOfItems={quantityOfItems}
									onPress={onPressCartSearchBar}
								/>
							</View>
						</View>
					)}
				</View>
			</View>
			<View
				// topInset
				// position='fixed'
				// width='100%'
				// top={0}
				// zIndex={2000}
				// backgroundColor={backgroundColor}
				className={`fixed w-full top-0 z-[2000] ${backgroundColor}`}

			/>
			<View className={`min-h[${minHeight}px]`} 
				//height={minHeight}
			/>
		</>
	)
}

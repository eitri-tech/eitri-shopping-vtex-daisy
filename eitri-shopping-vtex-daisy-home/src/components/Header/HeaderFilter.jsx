import Eitri from 'eitri-bifrost'

export default function HeaderFilter(props) {
	const { handleFilterModal, facetsModalReady, hasFilters, iconColor } = props

	return (
		<View
			// position='relative'
			className="relative"
			>
			<View>
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4.2673 6.24223C2.20553 4.40955 3.50184 1 6.26039 1H17.7396C20.4981 1 21.7945 4.40955 19.7327 6.24223L15.3356 10.1507C15.1221 10.3405 15 10.6125 15 10.8981V21.0858C15 22.8676 12.8457 23.7599 11.5858 22.5L9.58578 20.5C9.21071 20.1249 8.99999 19.6162 8.99999 19.0858V10.8981C8.99999 10.6125 8.87785 10.3405 8.66436 10.1507L4.2673 6.24223ZM6.26039 3C5.34088 3 4.90877 4.13652 5.59603 4.74741L9.99309 8.6559C10.6336 9.22521 11 10.0412 11 10.8981V19.0858L13 21.0858V10.8981C13 10.0412 13.3664 9.22521 14.0069 8.6559L18.404 4.74741C19.0912 4.13652 18.6591 3 17.7396 3H6.26039Z" fill="#0F0F0F"></path> </g></svg>
			</View>

			{hasFilters && (
				<View
					// position='absolute'
					// backgroundColor='primary-700'
					// width='12px'
					// height='12px'
					// right={-4}
					// top={-2}
					// borderRadius='circular'
					 className="absolute bg-primary-700 w-[12px] h-[12px] right-[-4px] top-[-2px] rounded-full"
				/>
			)}
		</View>
	)
}

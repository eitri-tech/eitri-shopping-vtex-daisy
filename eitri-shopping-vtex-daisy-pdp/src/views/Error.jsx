import Eitri from 'eitri-bifrost'
import { GenericError } from 'eitri-shopping-vtex-daisy-shared'
export default function Error() {
    const navigateToHome = () => {
        Eitri.navigation.navigate({
            path: 'Home',
        })
    }

    return (
        <Page topInset bottomInset>
            <GenericError 
                title = "" 
                bodyText = "" 
                onPress={navigateToHome}
            />
        </Page>
    )
}

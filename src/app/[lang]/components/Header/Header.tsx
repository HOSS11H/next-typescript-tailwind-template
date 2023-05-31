import Menu from "./components/Menu"
import { SafeUser } from "@/@types"

interface HeaderProps {
    currentUser: SafeUser | null
}

const Header : React.FC<HeaderProps> = ({currentUser} ) => {
    return (
        <div className="container p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold uppercase" >logo</h3>
                <Menu currentUser={currentUser} />
            </div>
        </div>
    )
}
export default Header
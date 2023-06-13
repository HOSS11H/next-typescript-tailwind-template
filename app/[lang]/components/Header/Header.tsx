import Menu from "./components/Menu"
import { SafeUser } from "@/@types"
import { ModeToggle } from "./components/ModeToggle"
import Link from "next/link"

interface HeaderProps {
    currentUser: SafeUser | null;
    lang: string | undefined
}

const Header : React.FC<HeaderProps> = ({currentUser, lang} ) => {
    return (
        <div className="container p-4">
            <div className="flex justify-between items-center">
                <Link href={`/${lang}`} >
                    <h3 className="text-xl font-semibold uppercase" >logo</h3>
                </Link>
                <div className="flex gap-6 items-center" >
                    <ModeToggle />
                    <Menu lang={lang} currentUser={currentUser} />
                </div>
            </div>
        </div>
    )
}
export default Header
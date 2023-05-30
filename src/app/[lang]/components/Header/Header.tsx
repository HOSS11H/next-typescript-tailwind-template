import Menu from "./components/Menu"

const Header = () => {
    return (
        <div className="container p-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold uppercase" >logo</h3>
                <Menu />
            </div>
        </div>
    )
}
export default Header
import logo from "../assets/images/logo.png"
import search from "../assets/images/search.png"
export default function Nav() {
    return (
        <>
        <div className="sticky">
            <nav className="bg-primary flex items-center justify-evenly shadow-lg shadow-black  w-100">
                <div className="flex items-center">
                    <img className="scale-75" src={logo} alt="" />
                    <h3 className="font-sans text-white text-3xl font-bold ml-2">Film Fusion</h3>
                </div>
                <div className="flex">
                    <input className="rounded top-5 bg-{#D9D9D9} indent-2" type="text" placeholder="Search Movie"/>
                    <img className="relative right-6 scale-90" src={search} alt="" />
                </div>
                <div>
                    <ul className="flex items-center">
                        <li className="px-5">Trending</li>
                        <li className="px-5">Recommended</li>
                        <li className="px-5">Login</li>
                    </ul>
                </div> 
            </nav>
        </div>
        </>
    )
}
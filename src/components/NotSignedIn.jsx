import plus from "../assets/images/Plus.png"
export default function NotSignedIn(){
    return(
        <>
            <div className="flex flex-col items-center mt-16">
                <a href=""><img className="scale-75" src={plus} alt="" /></a>
                <h4 className="text-2xl text-white font-sans mt-4">Sign in to acess your Watchlist</h4>
                <a className="btn mt-4" href="">Sign In</a>
            </div>
        </>
    );
}
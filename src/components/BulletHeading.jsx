export default function BulletHeading(props){
    return(
        <>
            <div className="flex ml-24 items-center mt-16 mb-16 font-sans">
                <div className="w-[6px] h-10 bg-purple rounded"></div>
                <h4 className="text-3xl font-bold text-white px-2">{props.title}</h4>
            </div>
        </>
    );
}
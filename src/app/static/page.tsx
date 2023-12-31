import Navbar from "@/components/Navbar";

export default function StaticHosting(){
    return(
        <div className="flex flex-col justify-center items-center w-full">
            <Navbar/>
            <p className="font-bold mt-10">Upload your static Contents here </p>
            <p className="text-xs">one website per username</p>
        </div>
    )
}
import {Link} from "react-router-dom";
import Navbar from "../components/Navbar";
import Card from "../components/Card_dashboard";

//import portada from "../assets/Jeonju1.jpg"
//import portada from "../assets/amsterdam1.jpg"
//import portada from "../assets/perugia1.jpg"
import portada from "../assets/venezia1.jpg"
import Search from "../icons/Search";

function Dashboard(){
    return(
        <div>
            <Navbar/>
            <div class="flex">
                <div class="flex-initial w-1/4 min-w-80 h-screen bg-stone-200 flex items-center justify-center">
                bbbbbbbbbb
                </div>
                <div class="flex-1 h-full flex-col items-center justify-center  p-4">
                    <div className="bg-red-300 w-full h-56 rounded-xl overflow-hidden relative ">
                        <div className="absolute w-full z-10 flex items-center justify-center">
                            
                                <input className="bg-white p-3 pl-7 pr-16 border-none rounded-full mt-6 opacity-70 z-10" style={{ width: '94%' }} />
                               
                                <div className="absolute top-3 m-6 z-20" style={{right: '3.5%'}} >
                                    <Search className="h-6 w-6" />
                                </div>
                            
                        </div>
                        
                        <div className="absolute inset-0 bg-black opacity-30">
                            </div>
                            <img src={portada} className="w-full h-full object-cover" alt="" />
                            
                        </div>
                        
                        <Card/>
                        <Card/>
                        <Card/>
                        <Card/>
                     
                    </div>
            </div>
        </div>
    )
}

export default Dashboard

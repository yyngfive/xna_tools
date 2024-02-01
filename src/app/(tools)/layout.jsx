

import Sidebar from "@/components/Sidebar";
//import ToolsProvier from "./provider";


export default function ToolLayout({ children }) {

    return (
        //<ToolsProvier>
        <>

            <div className='my-5 lg:w-2/3 mx-auto flex gap-1'>
                <Sidebar />
                <div className="ml-10 flex-auto">
                    {children}
                </div>


            </div>

        </>


        //</ToolsProvier>
    );

}
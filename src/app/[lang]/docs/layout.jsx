import Sidebar from "@/components/Sidebar";

export default function ToolLayout({ children }) {

    return (
        <>

            <div className='my-5 lg:w-2/3 mx-auto flex gap-1'>
                <Sidebar type='docs'/>
                <div className="ml-10 flex-auto">
                    {children}
                </div>
            </div>

        </>

    );

}
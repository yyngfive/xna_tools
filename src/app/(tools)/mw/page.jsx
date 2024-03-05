import { Header } from "@/components/Basic";
import { Link } from "@nextui-org/link";

export const metadata = {
    title: "MW Calculator",
};

export default function MW() {

    return (
        <div>
            <Header title="MW Calculator" />
            <span className="w-full flex justify-end my-4"><Link href="/docs/mw" isExternal showAnchorIcon className="">User Guide</Link></span>
            
        </div>
    );
}
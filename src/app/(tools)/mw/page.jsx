import { Header } from "@/components/Basic";
import { Link } from "@nextui-org/link";

export const metadata = {
    title: "MW Calculator",
};

export default function Oligo() {

    return (
        <div>
            <Header title="MW Calculator" />
            <span className="w-full my-4"><Link href="/docs/nw" isExternal showAnchorIcon className="float-right">User Guide</Link></span>
            
        </div>
    );
}
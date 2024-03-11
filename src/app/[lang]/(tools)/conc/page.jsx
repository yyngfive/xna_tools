import { Header } from "@/components/Basic";
import { Link } from "@nextui-org/link";
import ConcUi from "./ui";

export const metadata = {
    title: "ConcHelper",
};

export default function Conc() {

    return (
        <div>
            <Header title="ConcHelper" />
            <span className="w-full flex justify-end my-4"><Link href="/docs/conc" isExternal showAnchorIcon className="">User Guide</Link></span>
            <ConcUi/>
        </div>
    );
}
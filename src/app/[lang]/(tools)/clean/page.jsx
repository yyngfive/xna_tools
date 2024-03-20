import { Header } from "@/components/Basic";
import { Link } from "@nextui-org/link";
import CleanUi from "./ui";
export const metadata = {
    title: "CleanSeq",
};

export default function Conc() {

    return (
        <div>
            <Header title="CleanSeq" />
            <span className="w-full flex justify-end my-4"><Link href="/docs/clean" isExternal showAnchorIcon className="">User Guide</Link></span>
            <CleanUi/>
        </div>
    );
}
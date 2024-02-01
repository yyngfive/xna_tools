
import { Header } from "@/components/Basic";
import OligoUI from "./ui";
import { Link } from "@nextui-org/link";

export const metadata = {
    title: "OligoCalculator",
};

export default function Oligo() {

    return (
        <div>
            <Header title="OligoCalculator" />
            <span className="w-full my-4"><Link href="/docs/oligo" isExternal showAnchorIcon className="float-right">User Guide</Link></span>
            <OligoUI/>
        </div>
    );
}
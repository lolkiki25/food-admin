import { Sidebar } from "./_components/Sidebar";
import { FoodDialog } from "@/components/admin/FoodDialog";

export default function Home() {
    return (
        <div className="flex">
            <Sidebar />
            <FoodDialog />
        </div>
    )
};
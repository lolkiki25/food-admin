import { AdminLayout } from "./_components/AdminLayout";
import { FoodDialog } from "./_components/FoodDialog";



export default function Home() {
    return (
        <div>
            <AdminLayout>
                <FoodDialog/>
            </AdminLayout>
        </div>
    );
};
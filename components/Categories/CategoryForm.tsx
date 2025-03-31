import CategoryInterface from "@/interfaces/category.interface";
import { HydratedDocument } from "mongoose";


type CategoryFormProps = {
    category?: HydratedDocument<CategoryInterface>;
};

export default function CategoryForm({ category }: CategoryFormProps) {
    return <div>
        <h1>Category Form</h1>
    </div>
}
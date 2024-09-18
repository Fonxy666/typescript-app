import { useOutletContext } from "react-router-dom";
import { PreviousSearches } from "../components/PreviousSearches";
import { RecipeCard } from "../components/RecipeCard";
import { OutletContextType } from "../types/OutletContextType";

export const Recipes: React.FC = () => {
    const { setLoading } = useOutletContext<OutletContextType>();
    
    const testArray = [
        {
            imagePath: "/img/gallery/img_1.jpg",
            title: "Chicken pan pizza",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            authorImagePath: "/img/chiefs/img_1.jpg"
        },
        {
            imagePath: "/img/gallery/img_2.jpg",
            title: "Rice and meat",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            authorImagePath: "/img/chiefs/img_2.jpg"
        },
        {
            imagePath: "/img/gallery/img_3.jpg",
            title: "Indian one table",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            authorImagePath: "/img/chiefs/img_3.jpg"
        },
        {
            imagePath: "/img/gallery/img_4.jpg",
            title: "Pasta and vegetables",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            authorImagePath: "/img/chiefs/img_4.jpg"
        },
        {
            imagePath: "/img/gallery/img_5.jpg",
            title: "Vegetarian hamburger",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            authorImagePath: "/img/chiefs/img_5.jpg"
        },
        {
            imagePath: "/img/gallery/img_6.jpg",
            title: "One hand punch",
            description: "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
            authorImagePath: "/img/chiefs/img_6.jpg"
        }
    ]

    return (
        <div className="container">
            <PreviousSearches />
            <div className="recipes-container">
                { testArray.map((recipe, index) => (
                    <RecipeCard key={index} recipe={ recipe } />
                ))}
            </div>
        </div>
    )
}

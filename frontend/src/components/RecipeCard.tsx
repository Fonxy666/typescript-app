import { IRecipe } from '../interfaces/IRecipe';
import { CustomImage } from './CustomImage';
import { Link } from 'react-router-dom';

export const RecipeCard: React.FC<{recipe: IRecipe}> = ({ recipe }) => {
    return (
        <div className="recipe-card">
            <CustomImage imgSrc={recipe.imagePath} pt='65%' />
            <div className="recipe-card-info">
                <img src={recipe.authorImagePath} className="auther-img"  alt="" />
                <p className="recipe-title">{ recipe.title }</p>
                <p className="recipe-desc">{ recipe.description }</p>
                <Link className="view-link" to={"/settings"}>VIEW RECIPE</Link>
            </div>
        </div>
    )
}

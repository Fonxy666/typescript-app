import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PreviousSearches = () => {
    const searches: string[] = ["pizza", "burger", "cookies", "juice", "salad", "ice cream", "lasagna", "pudding", "soup"];

    return (
        <div className="previous-searches section">
            <h2>Previous Searches</h2>
            <div className="previous-searches-container">
                {searches.map((search, index) => (
                    <div key={index} style={{animationDelay: index * .1 + "s" }} className="search-item">{search}</div>
                ))}
            </div>
            <div className="search-box">
                <input type="text" placeholder="Search ..."/>
                <button className="basic-btn btn" style={{cursor: "default"}}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    )
}

import { Dispatch } from "react"; 
import "./search.scss";

import searchIcon from "../../assets/icons/search/search.svg";
import resetIcon from "../../assets/icons/cancel.svg";

interface ISearch {
    searchInput: string;
    setSearchInput: Dispatch<React.SetStateAction<string>>;
}

const Search = (props: ISearch) => {  
    const { searchInput, setSearchInput } = props;

    const resetSearchInput = () => setSearchInput("");

    return (
        <div className="search">
            <input 
                className="search-input" 
                placeholder="Search by event name or location..." 
                value={searchInput}
                onChange={event => setSearchInput(event.target.value)}
                maxLength={18}
            />
            <div className="search-searchIcon">
                <img src={searchIcon} alt="search" />
            </div>
            {
                searchInput.length > 0 &&
                <div 
                    className="search-resetIcon"
                    onClick={() => resetSearchInput()}
                >
                    <img src={resetIcon} alt="reset" />
                </div>
            }
        </div>
    );
}

export default Search;
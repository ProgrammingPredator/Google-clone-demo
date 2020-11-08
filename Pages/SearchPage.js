import React from 'react';
import './SearchPage.css';
import { useStateValue } from "./StateProvider";
import useGoogleSearch from './useGoogleSearch';
import Response from './response';
import { Link } from "react-router-dom";
import Search from './Search';
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
function SearchPage() {
    const [{term}, dispatch] = useStateValue();
    
    //LIVE API CALL
    const { data } = useGoogleSearch(term);

    //Mock API CALL
    //const data = Response;
    console.log(data)

    return (
        <div className="searchPage">
            
            <div className="searchPage_header">
                <Link to="/">
                    <img
                    className="searchPage__logo"
                    src="https://www.mycmmag.com/wp-content/uploads/2014/03/seo-sea-deux-composantes-du-referencement.png"
                    alt=""
                    />
                </Link>

                <div className="searchPage__headerBody">
                    <Search hidebuttons/>
                    <div className="searchPage__options">
                        <div className="searchPage__optionsLeft">
                            <div className="searchPage__option">
                                <SearchIcon/>
                                <Link to="/All">All</Link>
                            </div>
                            <div className="searchPage__option">
                                <DescriptionIcon/>
                                <Link to="/News">News</Link>
                            </div>
                            <div className="searchPage__option">
                                <ImageIcon/>
                                <Link to="/Images">Images</Link>
                            </div>
                            <div className="searchPage__option">
                                <LocalOfferIcon/>
                                <Link to="/Shopping">Shopping</Link>
                            </div>
                            <div className="searchPage__option">
                                <RoomIcon/>
                                <Link to="/Maps">Maps</Link>
                            </div>
                            <div className="searchPage__option">
                                <MoreVertIcon/>
                                <Link to="/More">More</Link>
                            </div>
                        </div>
                        <div className="searchPage__optionsRight">
                            <div className="searchPage__option">
                                <Link to="/Settings">Settings</Link>
                            </div>
                            <div className="searchPage__option">
                                <Link to="/Tools">Tools</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {term && (
                <div className="searchPage__results">
                    <p className="searchPage__resultCount">
                        About {data?.searchInformation.formattedTotalResults} ({data?.searchInformation.formattedSearchTime} seconds) results for {term}
                    </p>

                    {data?.items.map(item => (
                        <div className="searchPage__result">
                            <a href={item.link}>
                                {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image [0]?.src && (
                                    <img className="searchPage__resultImage"
                                        src={
                                            item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src
                                        }
                                        alt=""
                                    />
                                )}

                                {item.displayLink}
                            </a>
                            <a className="searchPage__resultTitle" href={item.link}>
                                <h2>{item.title}</h2> 

                            </a>
                            <p className="searchPage__resultSnippet">
                                {item.snippet}
                            </p>
                        </div>
                    ))}
                </div>
            )}
            
        </div>
    )
}

export default SearchPage

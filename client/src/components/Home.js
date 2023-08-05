import { useEffect, useState } from "react"
import "../styles/style.css"
//42d2c4151595f27a30f24d8df0417740
function Home() {
    const [query, setQuerys] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [movie, setMovie] = useState([])
    const [totalPages, setTotalPages] = useState(1);
    const handleClick = async () => {

        try {
            const response = await fetch(`http://localhost:8000/search?query=${query}&page=${currentPage}`);
            const data = await response.json();
            setMovie(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        if(movie.length){
        handleClick();
        }
    }, [currentPage]);

    return <>
        <header>
            <h1 id="main-head">Movies</h1>
            <nav id="nav-bar">
                <input type="text" id="search-bar" placeholder="Type here..." onChange={(e) => {
                    setQuerys(e.target.value)
                }} value={query} />
                <button id="search-btn" onClick={handleClick}>search</button>
            </nav>
        </header>
        <main>
            {movie.length ?<div id="page">Page No: {currentPage}</div>:""}
            <div id="main-container">

                {   movie.length ? movie.map((data, index) => {
                        return <div className="movie-container" key={index + 1}>
                            <div><h2>{data.original_title}</h2></div>
                            <div><span>Released Date: </span><p id="date">{data.release_date}</p></div>
                            <div>
                                <h3>Overview</h3>
                                <p>{data.overview}</p>
                            </div>
                            <div><h3>Rating</h3><span>{data.vote_average}</span></div>
                        </div>
                    }):""
                }
            </div>
            <div className="pagination">

                {movie.length ? Array.from({ length: totalPages }, (val, index) => {

                    return <button key={index + 1} id="page-btn" onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>

                }):""}
            </div>
        </main>
    </>
}
export default Home
import NavBar from '/components/general/NavBar.js';
import Header from "../components/general/Header";
import MatchCreator from "../components/createMatch/MatchCreator";


function Home() {
    return (
        <>
            <Header/>
            <NavBar/>
            <MatchCreator/>
            {/*<Selection/>*/}
        </>

    )
}

export default Home;
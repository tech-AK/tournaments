import Title from '../components/general/Title.js';
import NavBar from "../components/general/NavBar";
import Header from "../components/general/Header";
import TableResultsOverview from "../components/TableResultsOverview";



function Results() {
        return (
            <>
                <Header/>
                <NavBar/>
                <Title msg="Previous Tournament Results"/>
                <TableResultsOverview/>
            </>
            );
}


export default Results;
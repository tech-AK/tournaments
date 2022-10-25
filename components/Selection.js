//This component is currently not in use.
import Title from './general/Title.js';
import Link from "next/link";


function Selection() {
    return (
        <>
            <Title msg="Welcome to TournamentsApp"/>
            <div className="container p-5 ">
                <div className="row">
                    <div className="col">
                        <Card header="Create Match" title="Create a new Match from Scratch"
                              description="Choose this option to create a new match plan, evaluate the match and generate certificates for participants."
                              actiontext="Create Match" link="/createMatch"/>
                    </div>
                    <div className="col">
                        <Card header="View Match Results" title="View Last Match Results"
                              description="Using this option you can view the results of previous matches." actiontext="Display Results"
                              link="/results"/>
                    </div>
                </div>
            </div>
        </>
    )
}

function Card(props) {
    return (
        <div className="card border-dark mb-3">
            <div className="card-header">{props.header}</div>
            <div className="card-body text-dark">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <Link href={props.link}>
                    <a href="#" className="btn btn-primary stretched-link">{props.actiontext}</a>
                </Link>
            </div>
        </div>
    );
}


export default Selection;
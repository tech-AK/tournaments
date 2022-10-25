import Image from "next/image";

function NavBar() {
    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <Image src="/logo.svg" alt="" width="30" height="24" className="d-inline-block align-text-top"/>
                    <span className="ps-1">TournamentsApp</span>
                </a>
            </div>
        </nav>
    )
}


export default NavBar;
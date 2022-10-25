import Head from "next/head";

function Header(props) {
    return (
        <Head>
            <link rel="icon" href="/logo.svg"/>
            <title>TournamentsApp</title>
        </Head>
    );
}

export default Header;
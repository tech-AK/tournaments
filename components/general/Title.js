import Image from "next/image";

function Title(props) {
    return (
        <div className="text-center">
            <Image unoptimized="true" className="pb-0 mb-0 pt-2" src="/logo.svg" width={150} height={150} alt="logo"/>
            <h1 className="pt-0">{props.msg}</h1>

            <hr/>
        </div>
    );
}

export default Title;
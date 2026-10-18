import ConstellationLink from "../components/constellation-link";
import "./constellation-link-box.css";
import {getAllConstellationNames} from "../get_constellation";

export default function ConstellationLinkBox(){
    let constellations_names = getAllConstellationNames()
    let constellations = []
    constellations_names.forEach((element,i)=> {
        constellations.push(<ConstellationLink key={i} starName={element}></ConstellationLink>);
    });
    return(<div className="constellation-link-flex">
        {constellations}
    </div>)
}

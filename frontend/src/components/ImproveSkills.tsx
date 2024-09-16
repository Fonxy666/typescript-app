import React from 'react'
import { Link } from 'react-router-dom';

export const ImproveSkills: React.FC = () => {
    const improveList: string[] = [
        "Learn new recipes",
        "Experiment with food",
        "Write your own recepies",
        "Know nutrition facts",
        "Get cooking tips",
        "Get ranked"
    ];

    return (
        <div className="section improve-skills">
            <div className="col img">
                <img src="/img/gallery/img_10.jpg" alt="" />
            </div>
            <div className="col typography">
                <h1 className="title">Improve Your Culinary Skills</h1>
                { improveList.map((item, index) => (
                    <p className="skill-item" key={index}>{item}</p>
                )) }
                <Link to={"/signup"} className="btn">singup now</Link>
            </div>
        </div>
    )
}

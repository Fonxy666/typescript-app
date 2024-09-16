import React from 'react'
import { useNavigate } from 'react-router-dom';

export const ImproveSkills: React.FC = () => {
    const navigate = useNavigate();
    const improveList: string[] = [
        "Learn new recipes",
        "Experiment with food",
        "Write your own recepies",
        "Know nutrition facts",
        "Get cooking tips",
        "Get ranked"
    ];

    const handleClick = () => {
        navigate("/signup");
    }

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
                <button onClick={handleClick} className="animated-btn">Sign up</button>
            </div>
        </div>
    )
}

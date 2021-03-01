import React from 'react';

function Project(props) {
    return (
        <a href={props.link}>
            <div className='project'>
                <img src={props.imgSrc} alt='img.jpg' />
                <div className='proj-overlay'>
                    <h2>{props.title}</h2>
                    <p>{props.description}</p>
                </div>
            </div>
        </a>
    );
}

export default Project;
import React from 'react';
import Project from './Project';

class Portfolio extends React.Component {
    constructor() {
        super();

        const projects = [
            {
                title: 'BiasML',
                description: 'Political Bias Detector, built with Google Cloud AutoML NLP and Firebase',
                imgSrc: './images/biasml.png',
                link: 'https://bias-ml-analysis.herokuapp.com/'
            },
            {
                title: 'Voyager Probe Tracker',
                description: 'Voyager Mission Status Tracker, built with Puppeteer, Google Firebase,  and NASA APOD API',
                imgSrc: 'https://static.scientificamerican.com/sciam/cache/file/8E50AD41-BAD5-4790-93EB564C50213190_source.jpg',
                link: 'https://voyager-tracker-js.herokuapp.com/'
            }
        ];

        let projectsCompArr = [];

        for (let i = 0; i < projects.length; i++) {
            projectsCompArr.push(<Project title={projects[i].title} description={projects[i].description} imgSrc={projects[i].imgSrc} link={projects[i].link} key={i} />);
        }

        console.log(projects);

        this.state = {
            works: projectsCompArr
        };

        console.log(this.state.works);
    }

    render() {
        return (
            <div id='portfolio-cont'>
                <div id='portfolio-sec-cont'>
                    {this.state.works}
                </div>
            </div>
        );
    }
}

export default Portfolio;
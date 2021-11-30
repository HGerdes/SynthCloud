import "./footer.css";

const Footer = () => {

    return (
        <>
            <div className="footerContainer">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.14.0/devicon.min.css"></link>
                <div className="devName">Created by Harrison Gerdes</div>
                <a className="gitHubLink" href="https://github.com/HGerdes">
                    <i className="devicon-github-original"></i>
                </a>
                <a className="linkedInLink" href="https://www.linkedin.com/in/harrison-gerdes-31991a95/">
                    <i className="devicon-linkedin-plain"></i>
                </a>
            </div>
        </>
    )
}

export default Footer

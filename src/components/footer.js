import React from "react";
import GithubLogo from "./githublogo.png";

class GithubFooter extends React.Component {
    render() {
        return (
            <div className="github-footer">
                <a href="https://github.com/iGanzu">
                    <img src={GithubLogo} alt="Github Logo"/>
                </a>        
            </div>
        )
    }
}

export default GithubFooter;
import React, { Component } from "react";
import axios from "axios";



export default class PortfolioDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            portfolioItem: {},
        }
    }

    getPortfolioItem()
    {
        axios
            .get( `https://tristanmouritsen.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`, { withCredentials: true } )
            .then( response =>
            {
                this.setState( {
                    portfolioItem: response.data.portfolio_item,
                } );
                console.log("response from getPortfolioItem", response)
            } )
            .catch( error =>
            {
                console.log( "get portfolio item error", error );
            } );
    }

    componentDidMount() {
        this.getPortfolioItem();
    }

    visitUrl() {
        window.open(`${url}`, "Visit Portfolio Item URL")
    }

    render () {
        const {
            banner_image_url,
            category,
            description,
            logo_url,
            name,
            thumb_image_url,
            url,
        } = this.state.portfolioItem;

        const bannerStyles = {
            backgroundImage: "url(" + banner_image_url + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
        }

        const logoStyles = {
            height: "25vh",
            width: "auto",
        }

        const thumbnailStyles = {
            backgroundImage: "url(" + thumb_image_url + ")",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
        }

        return (
            <div className="portfolio-detail-wrapper">
                <div className="banner" style={bannerStyles}>
                    <img className="logo" style={logoStyles} src={logo_url} />
                </div>
                <div className="portfolio-detail-description-wrapper">
                    <div className="description">{description}</div>
                </div>
                <div className="bottom-content-wrapper">
                    <div style={thumbnailStyles} className="thumbnail-box">
                        <a href={url} className="btn site-link" target="_blank">
                        VISIT: {name}
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

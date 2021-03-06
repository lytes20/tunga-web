import React, { Component } from "react";
import "./Carousel.scss";
import Icon from "../core/Icon";

class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            windowWidth: 0,
            windowHeight: 0,
            leftPosition: 0,
            lastPropChange: props.activePage,
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }


    static getDerivedStateFromProps(props, currentState) {
        if (currentState.lastPropChange !== props.activePage) {
            return {
                current: props.activePage,
                lastPropChange: props.activePage,
            };
        }

        return null;
    }


    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }


    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }


    updateWindowDimensions() {
        this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
    }


    updatePage(current) {
        this.setState({ current });

        if (typeof this.props.onPageChange === 'function') {
            this.props.onPageChange(current);
        }
    }


    getLeftPosition({ pagination, perPage }) {
        const pageDetails = pagination.perPage.find((breakPoint) => breakPoint.perPage === perPage);
        const fullWidth = pageDetails.width * perPage || 100;
        const lastAdjuster = 0; // (this.state.current + perPage - 1) === pagination.total ? 100 - fullWidth : 0;

        const leftPosition = `-${(fullWidth / perPage * (this.state.current - 1)) - lastAdjuster}%`;
        return leftPosition;
    }


    hasNext({ pagination, perPage }) {
        return this.state.current <= pagination.total - parseInt(perPage, 10);
    }


    getDataPerPage({ pagination }) {
        const windowWith = this.state.windowWidth;
        const perPage = pagination.perPage.sort((a, b) => {
            return a.breakpoint - b.breakpoint;
        });

        return perPage.reduce((dataPerPage, data) => {
            if (dataPerPage) {
                return dataPerPage;
            }
            return windowWith <= data.breakpoint ? data.perPage : 0;
        }, 0);
    }


    render() {
        const { pagination, color, children, float } = this.props;
        const perPage = this.getDataPerPage({ pagination });
        const leftPosition = this.getLeftPosition({ pagination, perPage });

        const hasNext = this.hasNext({ pagination, perPage });
        const hasPrevious = this.state.current !== 1;

        return (
            <div className="Carousel">
                <div className={`${float} Carousel__pagination`}>
                    <Icon
                        onClick={() => hasPrevious && this.updatePage(this.state.current - 1)}
                        className={`${hasPrevious ? color : "text-gray"} Carousel__prev`}
                        name="previous"
                        size="md"
                    />
                    <Icon
                        onClick={() => hasNext && this.updatePage(this.state.current + 1)}
                        className={hasNext ? color : 'text-gray'}
                        name="next"
                        size="md"
                    />
                </div>
                <span className="clearfix"/>
                <div className="Carousel__container" style={{ left: leftPosition }}>
                    {children}
                </div>
            </div>
        );
    }
}

Carousel.propTypes = {};

export default Carousel;

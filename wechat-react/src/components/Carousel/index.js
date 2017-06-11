import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {IndexLink, Link, withRouter, hashHistory} from 'react-router';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './carousel.scss';

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.autoRun = this.autoRun.bind(this);
        this.state = {
            currentIndex: 0
        };
        this.timer = null;
        this.autoRun();
    }

    componentWillMount() {
        const {slides} = this.props;
        this.setState({
            single: slides.length === 1,
            num: slides.length,
            slides: slides
        });
    }

    componentDidMount() {
        let carousel = this.refs.carousel;
        if (!carousel) return false;
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer);
        this.timer = null;
    }

    autoRun() {
        const {speed, slides} = this.props;
        const self = this, len = slides.length;
        this.timer = setInterval(() => {
            let {currentIndex} = self.state;
            let nextIndex = currentIndex + 1;
            nextIndex = nextIndex < len ? nextIndex : 0;
            self.setState({
                currentIndex: nextIndex
            })
        }, speed);
    }

    touchEvent() {

    }

    render() {
        const cellWidth = window.innerWidth > 375 ? 375 : window.innerWidth;
        const slide = (slides) => {
            const {currentIndex} = this.state;
            let {element, enterDelay, leaveDelay, animation} = this.props;
            element = element ? element : "div";
            enterDelay = enterDelay ? enterDelay : 1800;
            leaveDelay = leaveDelay ? leaveDelay : 1800;
            animation = animation ? animation : "default";

            return (
                <CSSTransitionGroup
                    component={element}
                    transitionName={`carousel-${animation}`}
                    transitionEnterTimeout={enterDelay}
                    transitionLeaveTimeout={leaveDelay}>
                    <div className="slide"
                         key={currentIndex}
                         style={{width: cellWidth + 'px'}}>
                        <div className="pic" style={{backgroundImage: `url(${slides[currentIndex].url})`}}></div>
                    </div>
                </CSSTransitionGroup>
            )
        };
        const {num, single, slides} = this.state;
        return (
            <div className="carousel-box">
                {
                    single ?
                        <div className="slider-carousel">
                            <div className="slide">
                                <div className="pic" style={{backgroundImage: `url(${slides[0].url})`}}></div>
                            </div>
                        </div>
                        :
                        <div className="slider-carousel" ref='carousel'>
                            {slide(slides)}
                        </div>
                }
            </div>
        )
    }
}
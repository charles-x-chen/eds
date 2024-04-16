/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { Component, createRef } from 'preact';
import styles from './style.module.css';

export class ThreekitPlayer extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
        this.node = this.props.domNode;
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.ref.current.appendChild(this.node);
    }

    componentWillUnmount() {
        if (this.node.parentNode === this.ref.current) {
            document.body.appendChild(this.node);
        }
    }

    render() {
        return <div className={`threekit-player ${styles.threekitPlayer}`} ref={this.ref} />;
    }
}

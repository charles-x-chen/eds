/**
 * @package     BlueAcorn/Configurator
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import { Component, createRef } from 'preact';
import styles from './style.module.css';
import { synchronyInit } from '~/Api/Synchrony';

export class FinancingContentMessage extends Component {
    constructor(props) {
        super(props);
        this.ref = createRef();
        this.price = props.total;
        this.config = props.config;
    }

    shouldComponentUpdate() {
        return false;
    }

    componentDidMount() {
        this.node = document.getElementById('financing-content');

        if (!this.node) {
            this.node = document.createElement('div');
            this.node.id = 'financing-content';
            this.node.classList.add(styles.financingContent);

            const productContent = document.createElement('div');
            productContent.id = 'product-content';
            productContent.className = `product-content-val ${styles.hide}`;
            productContent.innerText = this.price;
            const syncPrice = document.createElement('div');
            syncPrice.className = `sync-price ${styles.priceWrapper}`;

            this.node.appendChild(productContent);
            this.node.appendChild(syncPrice);
            this.observeSyncPriceChanges(this.node);
        } else {
            document.getElementById('product-content').innerText = this.price;
            if (document.getElementById('syf-promo')?.innerText) {
                document.querySelector('.financing-content__wrapper').classList.add('active');
            }
        }

        this.ref.current.appendChild(this.node);

        synchronyInit(this.config);
    }

    componentWillUnmount() {
        if (this.node && this.node.parentNode === this.ref.current) {
            document.body.appendChild(this.node);
        }
    }

    observeSyncPriceChanges(node) {
        const syncPriceElement = node.querySelector('.sync-price');
        if (syncPriceElement) {
            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    if (mutation.type === 'childList' && mutation.target === syncPriceElement) {
                        node.closest('.financing-content__wrapper')?.classList?.add('active');
                    }
                }
            });
            observer.observe(syncPriceElement, { childList: true, subtree: true });
        }
    }

    render() {
        return <div className="financing-content__wrapper content-body" ref={this.ref} />;
    }
}

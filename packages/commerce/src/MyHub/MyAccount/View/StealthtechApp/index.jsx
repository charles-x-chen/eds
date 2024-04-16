/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */
import styles from './style.module.css';
import RichText from '~/View/RichText';

export default function StealthtechApp({ orders, blocks }) {
    const stealthtechAppBlock = blocks.stealthtechApp?.content;
    return (
        stealthtechAppBlock &&
        hasStealthtech(orders) && <RichText className={styles.steathAppBlock} content={stealthtechAppBlock} />
    );
}

function hasStealthtech(orders) {
    try {
        return (
            orders.length > 0 &&
            orders.some((order) =>
                order.items.some((item) => {
                    const name = item.name?.toLowerCase() || '';
                    return (
                        (name.includes('stealthtech') || name.includes('sound + charge')) && !name.includes('power hub')
                    );
                }),
            )
        );
    } catch {
        return false;
    }
}

/**
 * @package     BlueAcorn/MyHub
 * @author      Blue Acorn iCi <code@blueacorn.com>
 * @copyright   Copyright © Blue Acorn iCi. All Rights Reserved.
 */

import { useState } from 'preact/hooks';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import styles from './style.module.css';
import Form from './Form';

export default function CreateAccountForm({ email, firstname, lastname }) {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    return (
        <div className={styles.wrapper}>
            {message && (
                <div className={`${error ? styles.error : styles.success}`}>
                    {error ? <BsXCircleFill /> : <BsCheckCircleFill />}
                    {message}
                </div>
            )}
            {!message && (
                <Form
                    setMessage={setMessage}
                    email={email}
                    setError={setError}
                    firstname={firstname}
                    lastname={lastname}
                />
            )}
        </div>
    );
}

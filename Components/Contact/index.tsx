import React, { useContext, useState } from "react";
import Image from "next/image";
import styles from '../../styles/Contact.module.css';
import { motion } from 'framer-motion';
import { DataContext } from "../Context";
import { contactType } from "../../lang/dataLang";

const container = {
    initial: {
        x: -1000,
    },
    onScreen: {
        x: 0,
        transition: {
            duration: 1,
        }
    }
}

const Contact: React.FC<{contactData: contactType}> = ({contactData}) => {
    const dataContext = useContext(DataContext);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return(
        <motion.div className={styles.containerContact} ref={dataContext ? dataContext.contact : null} initial='initial' whileInView='onScreen' >
            <motion.div className={styles.contact} variants={container} >
                <div className={styles.contactContainer}>
                    <span className={styles.title}>
                        { contactData.titulo }
                    </span>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className={styles.input}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={styles.input}
                            required
                        />
                        <textarea
                            placeholder="Message"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className={styles.textarea}
                            required
                        />
                        <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                            {status === 'loading' ? 'Sending...' : 'Send Message'}
                        </button>
                        {status === 'success' && <p className={styles.successMsg}>Message sent!</p>}
                        {status === 'error' && <p className={styles.errorMsg}>Error sending message</p>}
                    </form>

                    <div className={styles.containerMedia}>
                        <a href="https://github.com/AngelLunas" target='_blank' rel="noreferrer" className={styles.link} >
                            <Image src='/githubIcon.png' alt='github icon' width={35} height={35} />
                        </a>
                        <a rel="noreferrer" target='_blank' href='https://www.linkedin.com/in/angel-david-luna-ospina-29b15a23b/' className={styles.link} >
                            <Image src='/linkedinIcon.png' alt='linkedin icon' width={35} height={35} />
                        </a>
                        <a rel="noreferrer" target='_blank' href='https://www.upwork.com/freelancers/~014db4649586b17d8a' className={styles.link} >
                            <Image src='/upIcon.png' alt='upwork icon' width={35} height={35} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Contact;
import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ label, value, icon: Icon, color = 'primary' }) => {
    return (
        <motion.div
            whileHover={{ y: -4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
            className="glass-panel"
            style={{
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'white',
                borderLeft: `4px solid var(--${color})`,
                flex: 1,
                minWidth: '200px'
            }}
        >
            <h3 style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: `var(--${color})`,
                marginBottom: '0.5rem'
            }}>
                {value}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                {Icon && <Icon size={18} />}
                <span style={{ fontSize: '1rem', fontWeight: 500 }}>{label}</span>
            </div>
        </motion.div>
    );
};

export default MetricCard;

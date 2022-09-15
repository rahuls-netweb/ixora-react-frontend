import React from "react";
import { Tabs, Tab } from 'react-bootstrap';
import styles from './tabs.module.css';

const CustomTabs = ({ tabs = [], activeKey = '', onTabSelect, children }) => {
    return (
        <Tabs
            defaultActiveKey={activeKey}
            id={`tabs-${activeKey}`}
            className={"tabs-Content " + styles.tabsContent}
            fill
            activeKey={activeKey}
            onSelect={(key) => {
                onTabSelect(key);
                // setKey(key);
                // navigate("/settings/" + key);
            }}
        >
            {tabs.map((tab) => (
                <Tab key={tab.key} eventKey={tab.key} title={tab.title}>
                    {children}
                </Tab>
            ))}
        </Tabs>
    );
};

export default CustomTabs;

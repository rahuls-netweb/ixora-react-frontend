import React from "react";
import styles from "./skeleton.module.css";

export default function Skeleton() {
    return (
        <div className={styles.skeleton}>
            <div className={styles.tableSkeleton}>
                {[...new Array(6)].map((_, index) => (
                    <div key={index} className={styles.tableSkeletonRow}>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

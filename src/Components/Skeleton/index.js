import React from "react";
import styles from "./skeleton.module.css";

export default function Skeleton() {
    return (
        <div className={styles.skeleton}>

            {/* <table className={styles.tableSkeleton}>
                <tr className={styles.tableSkeletonRow} >
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                    <td>
                        <div className={styles.line}></div>
                    </td>
                </tr>
            </table> */}

            <div className={styles.tableSkeleton}>
                <div className={styles.tableSkeletonRow}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.tableSkeletonRow}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.tableSkeletonRow}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.tableSkeletonRow}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.tableSkeletonRow}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
                <div className={styles.tableSkeletonRow}>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                    <div className={styles.line}></div>
                </div>
            </div>

        </div >
    );
}

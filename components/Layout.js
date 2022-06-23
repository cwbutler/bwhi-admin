import React from 'react'
import Head from 'next/head'
import classnames from 'classnames'

export default function Layout(props) {
    return (
        <div className={classnames("w-screen h-screen bg-[#f4f4f4]", props.className)}>
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.description} />
            </Head>
            {props.children}
        </div>
    );
}
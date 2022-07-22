import Head from 'next/head'
import React, { useState } from 'react';

interface ITitulo {
    Titulo: string;
}

const Header = (props: ITitulo) => {
    return (
        <Head>
            <title>{props.Titulo}</title>
            <meta name="description" content="Tela de login" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

export default Header;
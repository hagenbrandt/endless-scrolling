import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useState} from "react";

type PokeEntry = {
    name: string;
    url: string;
};

type PokeApiJSON = { count: number, next: string, previous: null, results: PokeEntry[] }

export default function Home({data}: {data: PokeEntry[]}) {
    const [scrollTop, setScrollTop] = useState(0)

    const limit = 14
    const rowHeight = 48
    const scrollPast = Math.floor(scrollTop / rowHeight)
    const sliceEnd = scrollPast + limit
    const maxHeight = 600

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://unpkg.com/@picocss/pico@latest/css/pico.min.css"/>
            </Head>
            <h2>Scroll-Top: {scrollTop} and ScrollPast: {scrollPast}</h2>
            <div onScroll={e => setScrollTop(e.currentTarget.scrollTop)} style={{maxHeight: maxHeight, overflow: 'auto'}}>
        <table>
            {data.slice(0, sliceEnd).map((item) => {
                return (
                    <tr key={item.name} style={{height: rowHeight}}>
                        <td>{item.name}</td>
                        <td>{item.url}</td>
                    </tr>
                )
            })}
        </table>
            </div>
        </>
    )
}

export const getStaticProps = async () => {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=300&offset=0').then((response) => response.json())
        .then((data: PokeApiJSON) => {
            return data
        }).then((data) => {
            return data.results
        });

    return {
        props: {
            data,
        }
    }
}
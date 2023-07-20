import Head from "next/head";
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
// const inter = Inter({ subsets: ['latin'] })
export default function Home() {
  const { main_home, main_heading, price_p, loader } = styles;
  const [data, setData] = useState()
  useEffect(() => {
    fetch("/api/getAllProducts", { method: "GET" })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.log(error))
  }, [])
  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={main_home}>

        {!data ? <div className={loader}></div> : data.map((item, i) =>
          <Link href={`/product/${item.id}`} key={i}>
            <h1 className={main_heading}>{item.name}</h1>
            <p>{item.description}</p>
            <p className={price_p}> Rs.<b>{item.price}</b></p>
          </Link>
        )}

      </div>
    </>
  );
}

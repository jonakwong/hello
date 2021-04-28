import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { connectToDatabase } from '../util/mongodb'


export default function Home({ properties }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>hello jjjjj</h1>
      <main className={styles.main}>
        {
          properties.map(el => (
            <h1>{el.username}</h1>
          ))
        }
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db
    .collection("players")
    .find({})
    .limit(20)
    .toArray();

  return {
    props: {
      properties: JSON.parse(JSON.stringify(data)),
    },
  }
}
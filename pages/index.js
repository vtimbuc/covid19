import Head from 'next/head'
import GlobalStats from '../components/GlobalStats'
import CountryStatsTable from '../components/CountryStatsTable'

export default function Home() {
  return (
    <>
      <Head>
        <title>COVID19</title>
      </Head>

      <div className="w-full p-8">
        <GlobalStats />

        <CountryStatsTable />
      </div>
    </>
  )
}

import { useData } from '../../utils/hooks'

function GlobalStat({ label, totalCases, newCases, color = '' }) {
  return (
    <article className="px-10 py-8 bg-gray-200 rounded-lg">
      <h3
        className={`mb-8 font-bold text-2xl uppercase text-gray-700 leading-none tracking-wider`}>
        {label}
      </h3>
      <span className={`font-bold text-6xl leading-none ${color}`}>
        {totalCases.toLocaleString()}
      </span>{' '}
    </article>
  )
}

export default function GlobalStats() {
  const data = useData('https://api.covid19api.com/summary')

  if (data && data.Global) {
    return (
      <section className="flex -m-4 mb-4">
        <div className="w-1/3 p-4">
          <GlobalStat
            label="Confirmed"
            totalCases={data.Global.TotalConfirmed}
            newCases={data.Global.NewConfirmed}
            color="text-orange-500"
          />
        </div>

        <div className="w-1/3 p-4">
          <GlobalStat
            label="Recovered"
            totalCases={data.Global.TotalRecovered}
            newCases={data.Global.NewRecovered}
            color="text-green-500"
          />
        </div>

        <div className="w-1/3 p-4">
          <GlobalStat
            label="Deaths"
            totalCases={data.Global.TotalDeaths}
            newCases={data.Global.NewDeaths}
            color="text-red-500"
          />
        </div>
      </section>
    )
  }

  return <></>
}

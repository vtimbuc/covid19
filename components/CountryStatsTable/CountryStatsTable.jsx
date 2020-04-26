import { useData } from '../../utils/hooks'

function TableCell({ children, tw = '' }) {
  return <td className={`px-8 py-4 ${tw}`}>{children}</td>
}

export default function CountryStatsTable() {
  const data = useData('https://api.covid19api.com/summary')

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy)
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }

  if (data && data.Countries) {
    const date = new Date(data.Date)

    const processedData = Array.from(data.Countries).map(country => {
      const TotalActive =
        country.TotalConfirmed - country.TotalRecovered - country.TotalDeaths

      const NewActive =
        country.NewConfirmed - country.NewRecovered - country.NewDeaths

      return {
        TotalActive,
        NewActive,
        ...country
      }
    })

    const sortedData = stableSort(
      processedData,
      getComparator('desc', 'TotalConfirmed')
    )

    return (
      <>
        <div className="py-8 bg-gray-200 rounded-lg">
          <table className="w-full">
            <thead>
              <tr>
                <TableCell tw="text-gray-700 font-bold text-xl uppercase tracking-wider">
                  Country
                </TableCell>

                <TableCell tw="text-gray-700 font-bold text-right text-xl uppercase tracking-wider">
                  Active
                </TableCell>

                <TableCell tw="text-gray-700 font-bold text-right text-xl uppercase tracking-wider">
                  Recovered
                </TableCell>

                <TableCell tw="text-gray-700 font-bold text-right text-xl uppercase tracking-wider">
                  Deaths
                </TableCell>
              </tr>
            </thead>

            <tbody>
              {sortedData.map((country, index) => {
                return (
                  <tr
                    key={country.CountryCode}
                    className={index % 2 !== 0 ? 'bg-gray-300' : ''}>
                    <TableCell>{country.Country}</TableCell>

                    <TableCell tw="text-right text-orange-500">
                      <div className="flex justify-end items-center">
                        {country.TotalActive.toLocaleString()}

                        {country.NewActive && country.NewActive > 0 ? (
                          <strong className="ml-3 text-orange-700">
                            +{country.NewActive.toLocaleString()}
                          </strong>
                        ) : (
                          ''
                        )}
                      </div>
                    </TableCell>

                    <TableCell tw="text-right text-green-500">
                      <div className="flex justify-end items-center">
                        {country.TotalRecovered.toLocaleString()}
                        {country.NewRecovered && country.NewRecovered > 0 ? (
                          <strong className="ml-3 text-green-700">
                            +{country.NewRecovered.toLocaleString()}
                          </strong>
                        ) : (
                          ''
                        )}
                      </div>
                    </TableCell>

                    <TableCell tw="text-right text-red-500">
                      <div className="flex justify-end items-center">
                        {country.TotalDeaths.toLocaleString()}
                        {country.NewDeaths && country.NewDeaths > 0 ? (
                          <strong className="ml-3 text-red-700">
                            +{country.NewDeaths.toLocaleString()}
                          </strong>
                        ) : (
                          ''
                        )}
                      </div>
                    </TableCell>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-center text-gray-500">
          Last Updated:{' '}
          <a
            href="https://covid19api.com/"
            className="mt-8 text-center text-blue-500 hover:text-blue-800">
            {date.toLocaleString(undefined, {
              dateStyle: 'full',
              timeStyle: 'short'
            })}
          </a>
        </p>
      </>
    )
  }

  return <></>
}

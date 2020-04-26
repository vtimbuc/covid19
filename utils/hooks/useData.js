import { useState, useEffect } from 'react'

export default function useData(url) {
  const [data, setData] = useState()

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(url)
        .then(res => res.json())
        .catch(error => console.log(error))

      setData(data)
    }

    fetchData()
  }, [url])

  return data
}

import { useEffect, useState } from 'react'

interface BuildDetails {
  id: string
  state: string
  created_at: string
  updated_at: string
  user_id: string
  error_message: string
  branch: string
  deploy_id: string
  sha: string
  site_name: string
  site_id: string
  duration: number
}

const NetlifyBuildDuration: React.FC<{ siteId: string; accessToken: string }> = ({ siteId, accessToken }) => {
  const [buildDuration, setBuildDuration] = useState<string | null>(null)

  useEffect(() => {
    const fetchBuildData = async () => {
      const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/builds`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const data: BuildDetails[] = await response.json()
      const latestBuild = data[0]
      const durationInSeconds = latestBuild.duration
      const minutes = Math.floor(durationInSeconds / 60)
      const seconds = durationInSeconds % 60
      setBuildDuration(`${minutes} minutes ${seconds} seconds`)
    }

    fetchBuildData()
  }, [accessToken, siteId])

  return <div>Last build duration: {buildDuration}</div>
}

export default NetlifyBuildDuration

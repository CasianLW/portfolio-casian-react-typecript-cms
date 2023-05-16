import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import NetlifyDeployButton from './netlifyDeployButton'

const NetlifyBuildCounter: React.FC<{ siteId: string; accessToken: string }> = ({ siteId }) => {
  // useEffect(() => {
  //   const fetchBuildData = async () => {
  //     try {
  //       const response = await fetch(`https://api.netlify.com/api/v1/sites/${siteId}`)

  //       if (response.ok) {
  //         const data = await response.json()
  //         const builds = data.length
  //         setCurrentBuild(builds)
  //         // setMaxBuilds(data[0].site_capabilities.concurrent_builds)
  //         console.log(data)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching build data:', error)
  //     }
  //   }

  //   fetchBuildData()
  // }, [siteId, accessToken])

  // return <div>{currentBuild !== null && maxBuilds !== null && <span>Builds/{maxBuilds}</span>}</div>
  return (
    <>
      <div className="text-cas-black-600 bg-cas-white-100 p-4 rounded-3xl">
        <div>
          <h2>Netlify Infos</h2>
          <p>Deploy status</p>
          <img
            className="pt-2 pb-6"
            src={`https://api.netlify.com/api/v1/badges/${siteId}/deploy-status`}
            alt="Netlify build status"
            width={120}
            height={60}
          />
          <NetlifyDeployButton />
        </div>
      </div>
    </>
  )
}

export default NetlifyBuildCounter

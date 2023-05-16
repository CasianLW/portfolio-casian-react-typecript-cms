import React, { useState } from 'react'

const NetlifyDeployButton: React.FC = () => {
  const [deployStatus, setDeployStatus] = useState<string | null>(null)

  const triggerDeploy = async () => {
    try {
      const response = await fetch('https://api.netlify.com/build_hooks/6462d13460ac1a14b5c6c209', {
        method: 'POST',
      })

      if (response.ok) {
        setDeployStatus('Success: Deployment triggered')
      } else {
        setDeployStatus('Error: Failed to trigger deployment')
      }
    } catch (error) {
      setDeployStatus('Error: Failed to trigger deployment')
      console.error('Error triggering deployment:', error)
    }
    setTimeout(() => {
      setDeployStatus(null)
    }, 3000) // Delay for 3 seconds (3000 milliseconds)
  }

  return (
    <div>
      <button className="contact-btn" onClick={triggerDeploy}>
        Trigger Deploy
      </button>
      {deployStatus && <div>{deployStatus}</div>}
    </div>
  )
}

export default NetlifyDeployButton

'use client'

import { useState } from 'react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Multiple Intelligence Test',
    siteDescription: 'Discover your unique cognitive strengths',
    allowRegistration: true,
    requireEmailVerification: false,
    maxTestsPerUser: 10,
    testTimeouts: {
      easy: 60,
      medium: 30,
      hard: 15
    },
    emailNotifications: {
      newUser: true,
      testCompleted: false,
      weeklyReport: true
    }
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    // Simulate saving
    setTimeout(() => {
      setSaving(false)
      alert('Settings saved successfully!')
    }, 1000)
  }

  const handleInputChange = (path: string, value: any) => {
    const keys = path.split('.')
    setSettings(prev => {
      const newSettings = { ...prev }
      let current = newSettings
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]]
      }
      
      current[keys[keys.length - 1]] = value
      return newSettings
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-700">
          Configure your Multiple Intelligence Test platform settings.
        </p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">General Settings</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                    Site Name
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    value={settings.siteName}
                    onChange={(e) => handleInputChange('siteName', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="maxTestsPerUser" className="block text-sm font-medium text-gray-700">
                    Max Tests Per User
                  </label>
                  <input
                    type="number"
                    id="maxTestsPerUser"
                    value={settings.maxTestsPerUser}
                    onChange={(e) => handleInputChange('maxTestsPerUser', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-700">
                  Site Description
                </label>
                <textarea
                  id="siteDescription"
                  rows={3}
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* User Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">User Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="allowRegistration"
                    type="checkbox"
                    checked={settings.allowRegistration}
                    onChange={(e) => handleInputChange('allowRegistration', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allowRegistration" className="ml-2 block text-sm text-gray-900">
                    Allow new user registration
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="requireEmailVerification"
                    type="checkbox"
                    checked={settings.requireEmailVerification}
                    onChange={(e) => handleInputChange('requireEmailVerification', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="requireEmailVerification" className="ml-2 block text-sm text-gray-900">
                    Require email verification for new users
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Test Settings */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Test Settings</h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <label htmlFor="easyTimeout" className="block text-sm font-medium text-gray-700">
                    Easy Level Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    id="easyTimeout"
                    value={settings.testTimeouts.easy}
                    onChange={(e) => handleInputChange('testTimeouts.easy', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="mediumTimeout" className="block text-sm font-medium text-gray-700">
                    Medium Level Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    id="mediumTimeout"
                    value={settings.testTimeouts.medium}
                    onChange={(e) => handleInputChange('testTimeouts.medium', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="hardTimeout" className="block text-sm font-medium text-gray-700">
                    Hard Level Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    id="hardTimeout"
                    value={settings.testTimeouts.hard}
                    onChange={(e) => handleInputChange('testTimeouts.hard', parseInt(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email Notifications */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Email Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="newUser"
                    type="checkbox"
                    checked={settings.emailNotifications.newUser}
                    onChange={(e) => handleInputChange('emailNotifications.newUser', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="newUser" className="ml-2 block text-sm text-gray-900">
                    Notify when new user registers
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="testCompleted"
                    type="checkbox"
                    checked={settings.emailNotifications.testCompleted}
                    onChange={(e) => handleInputChange('emailNotifications.testCompleted', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="testCompleted" className="ml-2 block text-sm text-gray-900">
                    Notify when test is completed
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="weeklyReport"
                    type="checkbox"
                    checked={settings.emailNotifications.weeklyReport}
                    onChange={(e) => handleInputChange('emailNotifications.weeklyReport', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="weeklyReport" className="ml-2 block text-sm text-gray-900">
                    Send weekly reports
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Settings'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

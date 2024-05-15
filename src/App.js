import React, { useState } from 'react'
import './App.css'
import { FaDownload, FaPaste } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import i18n from './i18n'
import Features from './Features'

function App () {
  const [url, setUrl] = useState('')
  const [format, setFormat] = useState('bestvideo+bestaudio/best')
  const [info, setInfo] = useState(null)
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const handleGetInfo = async () => {
    setError('') // Reset error before new request
    setInfo(null)
    try {
      const response = await fetch(`https://api.freedl.cc/api/info?query=${encodeURIComponent(url)}&format=${encodeURIComponent(format)}`)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      setInfo(data)
    } catch (error) {
      console.error('Error fetching info:', error)
      setError('Failed to fetch info. Please try again later.')
    }
  }

  const renderFormats = (formats, hasAudio) => {
    return formats
      .filter((format) => hasAudio ? format.audio_channels > 0 : format.audio_channels === null)
      .map((format) => (
        <li key={format.format_id}>
          {format.format} - {format.resolution}
          <button
            onClick={() => window.location.href = format.url}
            className="button format-button"
          >
            {t('download')}
          </button>
        </li>
      ))
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="navbar-brand">FreeDownLoad</div>
          <div className="navbar-links">
            <label htmlFor="language-select">{t('language')}</label>
            <select
              id="language-select"
              onChange={(e) => changeLanguage(e.target.value)}
              defaultValue={i18n.language}
            >
              <option value="en">EN</option>
              <option value="cn">中文</option>
            </select>
          </div>
        </nav>
        <div className="content">
          <h1>{t('title')}</h1>
          <p>{t('subtitle')}</p>
          <div className="form-group">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('paste_placeholder')}
              className="input-field"
            />
            <button onClick={() => navigator.clipboard.readText().then(text => setUrl(text))} className="button paste-button">
              <FaPaste /> {t('paste_button')}
            </button>
            <button onClick={handleGetInfo} className="button get-info-button">
              <FaDownload /> {t('get_info_button')}
            </button>
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        {info && (
          <div className="result">
            <h2>{info.title}</h2>
            <img src={info.thumbnail} alt={info.title} className="thumbnail" />
            <p>{t('uploaded_by')} {info.uploader}</p>
            <p>{t('duration')}: {info.duration}</p>
            <div className="formats">
              <h3>{t('formats_with_audio')}</h3>
              <ul>
                {renderFormats(info.formats, true)}
              </ul>
              <h3>{t('formats_without_audio')}</h3>
              <ul>
                {renderFormats(info.formats, false)}
              </ul>
            </div>
          </div>
        )}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8954302793963830"
          crossorigin="anonymous"></script>
      </header>
      <Features />
    </div>
  )
}

export default App

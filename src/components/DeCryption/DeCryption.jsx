import { useState, useRef } from 'react'
import './DeCryption.scss'
import CryptoJS from 'crypto-js'
import Alert from '@mui/material/Alert'

function DeCryption() {
  const input = useRef(null)
  const [imageSrc, setImageSrc] = useState('')
  const [extractedMessage, setExtractedMessage] = useState('')
  const [decryptKey, setDecryptKey] = useState('')
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)

  const handleChangeImg = () => {
    const file = input.current.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const extractMessageFromImage = (imageData) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.src = imageData

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data

      let binaryMessage = ''
      for (let i = 0; i < data.length; i += 4) {
        binaryMessage += (data[i] & 1).toString()
      }

      let encryptedMessage = ''
      for (let i = 0; i < binaryMessage.length; i += 8) {
        const byte = binaryMessage.slice(i, i + 8)
        encryptedMessage += String.fromCharCode(parseInt(byte, 2))
      }

      try {
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, decryptKey)
        const originalText = decryptedBytes.toString(CryptoJS.enc.Utf8)

        console.log(originalText)
        if (!originalText) {
          throw new Error('Decryption failed')
        }
        setExtractedMessage(originalText)
        setShowSuccessAlert(true)
        setShowErrorAlert(false)
      } catch (error) {
        setShowSuccessAlert(false)
        setShowErrorAlert(true)
      }
    }
  }

  const handleExtractMessage = () => {
    if (imageSrc) {
      extractMessageFromImage(imageSrc)
    } else {
      alert('Please select an image.')
    }
  }

  return (
    <>
      {showSuccessAlert && (
        <Alert
          variant="filled"
          severity="success"
          sx={{
            position: 'absolute',
            top: '50px',
            right: '50px'
          }}
          onClose={() => setShowSuccessAlert(false)}
        >
          {extractedMessage}
        </Alert>
      )}
      {showErrorAlert && (
        <Alert
          variant="filled"
          severity="error"
          sx={{
            position: 'absolute',
            top: '50px',
            right: '50px'
          }}
          onClose={() => setShowErrorAlert(false)}
        >
          Khóa không đúng
        </Alert>
      )}
      <h1>Chọn file ảnh muốn Lấy tin</h1>
      <input onChange={handleChangeImg} ref={input} type="file" accept="image/*" />
      <div className="preview">
        <img src={imageSrc || ''} alt="Preview" />
      </div>
      <div className="input">
        <input
          type="password"
          placeholder="Nhập khóa"
          value={decryptKey}
          onChange={(e) => setDecryptKey(e.target.value)}
        />
        <button onClick={handleExtractMessage}>Gửi</button>
      </div>
    </>
  )
}

export default DeCryption

import { useRef, useState } from 'react'
import './EnCryption.scss'
import CryptoJS from 'crypto-js'
import Alert from '@mui/material/Alert'

function EnCryption() {
  const input = useRef(null)
  const input1 = useRef(null)
  const input2 = useRef(null)
  const [dataImg, setDataImg] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [encryptionKey, setEncryptionKey] = useState(null)
  const [showKeyAlert, setShowKeyAlert] = useState(false) // State to control key alert visibility
  const [showError, setShowError] = useState(false)

  // Function to generate random AES key
  const generateRandomKey = () => {
    setShowError(true)
  }
  const handleChangeImg = () => {
    const file = input.current.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDataImg(reader.result)
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const hideMessageInImage = (imageData, message, encryptionKey) => {
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

      // Encrypt message

      const encryptedMessage = CryptoJS.AES.encrypt(message, encryptionKey).toString()
      const binaryMessage = encryptedMessage
        .split('')
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('')

      // Hide the encrypted message in the image data using LSB
      let messageIndex = 0
      for (let i = 0; i < data.length; i += 4) {
        if (messageIndex < binaryMessage.length) {
          data[i] = (data[i] & 254) | parseInt(binaryMessage[messageIndex], 2)
          messageIndex++
        } else {
          break
        }
      }

      ctx.putImageData(imageData, 0, 0)
      const newImageData = canvas.toDataURL()
      setImageSrc(newImageData)
      setShowAlert(true)
      setTimeout(() => setShowAlert(false), 3000)
    }
  }

  const handleSubmit = () => {
    if (input1.current.value == 'a' && input2.current.value == '1') {
      setShowError(false)
      setShowKeyAlert(true)
      setTimeout(() => setShowKeyAlert(false), 10000)
    } else {
      alert('Tên tài khoản hoặc mật khẩu không chính xác')
    }
  }
  const handleHideMessage = async () => {
    const message = document.querySelector('.textinput').value
    if (message && dataImg) {
      const randomKey = CryptoJS.lib.WordArray.random(32)
      const base64Key = CryptoJS.enc.Base64.stringify(randomKey)
      setEncryptionKey(base64Key)

      await new Promise((resolve) => setTimeout(resolve, 0)) // Chờ cho React cập nhật state

      hideMessageInImage(dataImg, message, base64Key) // Sử dụng base64Key thay vì encryptionKey
    } else {
      if (!message && !dataImg) {
        alert('Vui lòng chọn ảnh và nhập bản rõ.')
      } else if (!dataImg) {
        alert('Vui lòng chọn ảnh.')
      } else {
        alert('Vui lòng nhập bản rõ.')
      }
    }
  }

  return (
    <>
      {showAlert && (
        <Alert
          variant="filled"
          severity="success"
          sx={{
            position: 'absolute',
            top: '50px',
            right: '50px'
          }}
        >
          Đã giấu tin thành công
        </Alert>
      )}

      {showKeyAlert && (
        <Alert
          variant="filled"
          severity="warning"
          sx={{
            position: 'absolute',
            top: '50px',
            right: '50px'
          }}
        >
          {encryptionKey ?? 'Chưa có khóa'}
        </Alert>
      )}
      {showError && (
        <Alert
          variant="filled"
          severity="info"
          sx={{
            position: 'absolute',
            top: '50px',
            right: '50px',
            width: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 20px'
          }}
          onClose={() => setShowError(false)}
        >
          <h3>Vui lòng đăng nhập</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              ref={input1}
              type="text"
              placeholder="Nhập tài khoản"
              style={{
                border: 'none',
                outline: 'none',
                marginTop: '20px',
                borderRadius: '10px',
                height: '20px',
                padding: '7px'
              }}
            />
            <input
              ref={input2}
              type="password"
              placeholder="Nhập mật khẩu"
              style={{
                border: 'none',
                outline: 'none',
                marginBottom: '20px',
                borderRadius: '10px',
                height: '20px',
                padding: '7px'
              }}
            />
          </div>
          <button
            style={{
              padding: '5px',
              borderRadius: '5px',
              border: 'none',
              marginRight: '20px',
              cursor: 'pointer'
            }}
            onClick={handleSubmit}
          >
            Đăng nhập
          </button>
          <button
            style={{
              padding: '5px',
              borderRadius: '5px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Đăng Ký
          </button>
        </Alert>
      )}

      <h1>Chọn file ảnh muốn giấu tin</h1>
      <input onChange={handleChangeImg} ref={input} type="file" accept="image/*" className="file" />
      <div className="preview">
        <img src={imageSrc || ''} alt="Preview" />
      </div>
      <div className="input">
        <input type="text" className="textinput" placeholder="Nhập bản rõ..." />
        <button onClick={handleHideMessage}>Gửi</button>
        <button onClick={generateRandomKey}>Lấy khóa</button>
      </div>
    </>
  )
}

export default EnCryption

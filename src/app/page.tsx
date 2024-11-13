'use client'
import { useState, ChangeEvent } from 'react'
import { PDFDocument } from 'pdf-lib'
import styles from './page.module.css'
import { degrees } from 'pdf-lib'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [rotatedFile, setRotatedFile] = useState<Blob | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [rotation, setRotation] = useState<number>(0) // 记录当前旋转角度

  // 处理文件上传
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setRotatedFile(null)
      setRotation(0) // 上传文件时重置旋转角度

      // 创建 PDF 预览图
      const url = URL.createObjectURL(uploadedFile)
      setPreviewUrl(url)
    }
  }

  // 旋转 PDF 页面
  const handleRotate = async (value: number) => {
    if (!file) return

    // 加载 PDF 文档，忽略加密
    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer, {
      ignoreEncryption: true,
    })

    // 新的旋转角度
    const newRotation = (rotation + value) % 360
    setRotation(newRotation) // 更新当前旋转角度

    // 旋转每一页，确保角度是有效的 90° 倍数
    pdfDoc.getPages().forEach((page) => {
      page.setRotation(degrees(newRotation)) // 使用新的旋转角度
    })

    // 保存旋转后的 PDF 文件
    const pdfBytes = await pdfDoc.save()
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    setRotatedFile(blob)

    // 更新预览
    setPreviewUrl(URL.createObjectURL(blob))
  }

  // 取消旋转，恢复原始文件
  const handleCancelRotation = () => {
    if (!file) return

    setRotatedFile(null)
    setRotation(0) // 重置角度为 0
    setPreviewUrl(URL.createObjectURL(file)) // 恢复为原始文件预览
  }

  // 下载旋转后的 PDF 文件
  const downloadFile = () => {
    if (!rotatedFile) return

    const link = document.createElement('a')
    link.href = URL.createObjectURL(rotatedFile)
    link.download = 'rotated.pdf'
    link.click()
  }

  return (
    <div className={styles.container}>
      <h1>Rotate PDF Pages</h1>
      <p>
        Simply click on a page to rotate it. You can then download your modified
        PDF.
      </p>

      {/* 文件上传输入框 */}
      <input
        type="file"
        onChange={handleFileChange}
        accept=".pdf"
        className={styles.inputContainer}
      />

      <div className={styles.buttonContainer}>
        <div>
          <button onClick={() => handleRotate(90)} className={styles.button}>
            旋转
          </button>
        </div>

        <div>
          <button onClick={handleCancelRotation} className={styles.button}>
            取消旋转
          </button>
        </div>

        {rotatedFile && (
          <div>
            <button onClick={downloadFile} className={styles.button}>
              下载旋转后的 PDF
            </button>
          </div>
        )}
      </div>
      {/* 显示 PDF 预览图 */}
      {previewUrl && (
        <embed
          src={previewUrl}
          width="400"
          height="500"
          type="application/pdf"
        />
      )}
    </div>
  )
}

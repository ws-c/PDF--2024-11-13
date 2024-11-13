import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <title>旋转 PDF 页面 - 免费 PDF 工具</title>
      <meta
        name="description"
        content="轻松旋转 PDF 页面，免费下载修改后的 PDF 文件。快速、免费的 PDF 旋转工具。"
      />
      <meta
        name="keywords"
        content="旋转 PDF, PDF 工具, 在线 PDF 旋转, 免费 PDF 编辑, 旋转页面 PDF"
      />
      <body>
        <Header />
        <div>{children}</div>
        <Footer />
      </body>
    </html>
  )
}

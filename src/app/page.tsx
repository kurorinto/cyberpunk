import photos from '@/constants/photos'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="cards-container">
      {photos.map((item, index) => (
        <Link key={index} className="card" href={`/photos/${item.id}`} passHref>
          <Image
            src={item.src}
            alt=""
            width={300}
            height={100}
            priority
            className="w-auto h-auto"
          />
        </Link>
      ))}
    </div>
  )
}

import photos from '@/constants/photos'
import Image from 'next/image'
import { FC } from 'react'

interface PhotoProps {
  params: { id: string }
}

const Photo: FC<PhotoProps> = ({ params }) => {
  const photo = photos.find((p) => p.id === params.id)

  return <Image src={photo?.src || ''} alt="photo" width={300} height={200} />
}

export default Photo

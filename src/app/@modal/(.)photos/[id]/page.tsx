import Image from "next/image"
import { FC } from "react"
import { Modal } from "./modal"
import photos from "@/constants/photos"

interface PhotoModalProps {
  params: { id: string };
}

const PhotoModal: FC<PhotoModalProps> = ({ params }) => {
  const photo = photos.find((p) => p.id === params.id)
  return (
    <Modal>
      <Image src={photo?.src || ""} alt="photo" width={300} height={200} />
    </Modal>
  )
}

export default PhotoModal

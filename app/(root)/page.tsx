'use client'

import Modal from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect } from "react";

const SetUpPage = () => {
  const onOpen = useStoreModal((state) => state.onOpen)
  const isOpen = useStoreModal((state) => state.isOpen)

  useEffect(() => {
    if(!isOpen) {
      onOpen()
    }
  }, [isOpen, onOpen])

  
  return (
   <div className="p-4">
    <Modal title={"Test Title"} description={"Deksripsi"} isOpen onClose={() => {}}>
      Children 
    </Modal>
   </div>
  );
}

export default SetUpPage;
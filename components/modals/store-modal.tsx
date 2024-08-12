 'use client'

 import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";

 export const StoreModal = () => {
    const storeModal = useStoreModal();
    return (
        <Modal
        title = "Buat Store"
        description= "Tambahkan Store untuk Menyimpan"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
        >
            Store Form
        </Modal>
    )
 }
 'use client'

import * as z from 'zod'
import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import axios from 'axios'; 
import toast from 'react-hot-toast';

const formSchema = z.object({
    name: z.string().min(1),
});

 export const StoreModal = () => {
    const [loading, setLoading] = useState(false)

    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            name : "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {  
        try {  
            setLoading(true);  
            const response = await axios.post("/api/stores", values);  
            console.log(response.data);  
            toast.success("Berhasil Menambahkan Store");  
        } catch (error) {  
            if (axios.isAxiosError(error) && error.response) {  
                toast.error(error.response.data);  
            } else {  
                toast.error("Gagal Menambahkan Store");  
            }  
        } finally {  
            setLoading(false);  
        }  
    };

    return (
        <Modal
        title = "Buat Store"
        description= "Tambahkan Store untuk Menyimpan"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
        >
        <div>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                         <FormField
                         control={form.control}
                         name='name'
                         render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input 
                                    disabled={loading}
                                    placeholder='E-Commerce Name'
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                         )}/>
                            <div className='mt-4 pt-6 space-x-2 flex items-center justify-end w-ful'>
                                <Button
                                disabled={loading} 
                                variant="outline"
                                onClick={storeModal.onClose}>Cancel</Button>
                                <Button 
                                disabled={loading}
                                type='submit'>Continue</Button>
                            </div>
                     </form>
                </Form>
            </div>
        </div>
        </Modal>
    )
 }
 'use client'

import * as z from 'zod'
import Modal from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const formSchema = z.object({
    name: z.string().min(1),
});


const onSubmit = async (value: z.infer<typeof formSchema>) => {
    console.log(value);
};


 export const StoreModal = () => {

    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver : zodResolver(formSchema),
        defaultValues : {
            name : "",
        },
    });

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
                                    placeholder='E-Commerce Name'
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                         )}/>
                            <div className='mt-4 pt-6 space-x-2 flex items-center justify-end w-ful'>
                                <Button 
                                variant="outline"
                                onClick={storeModal.onClose}>Cancel</Button>
                                <Button type='submit'>Continue</Button>
                            </div>
                     </form>
                </Form>
            </div>
        </div>
        </Modal>
    )
 }
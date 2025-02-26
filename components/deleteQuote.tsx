import { createQuote, deleteQuote } from "@/app/lib/utils";
import { TQuote } from "@/app/quotes/page";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Tooltip,
    addToast,
    Textarea,
} from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function DeleteQuote({ userId, quote }: { userId: string, quote: TQuote }) {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const res = await deleteQuote(quote, userId);
            if (!res.ok) throw res.error


            addToast({
                color: 'success',
                title: "Quote Deleted.",
            });

            setIsLoading(false);
            router.push('/quotes')
            onClose()
        } catch (error) {
            onClose()
            setIsLoading(false);
            console.log(error);

            addToast({
                color: 'danger',
                title: "Failed to Create Quote",
                description: (error as Error).message,
                promise: new Promise((resolve) => setTimeout(resolve, 3000)), // Still use a promise to show progress
            });
        }
    };

    return (
        <>
            <Tooltip content="Delete this quote.">
                <Trash2 className="text-red-500 absolute top-2 right-4 cursor-pointer hover:text-red-300 transition" onClick={onOpen} />
            </Tooltip>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={(e) => onSubmit(e)} >
                            <ModalHeader className="flex flex-col font-medium">Delete your Quote</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete this quote ?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    color="primary"
                                    type="submit"
                                    isLoading={isLoading}
                                >
                                    Yup
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

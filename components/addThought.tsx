import { createQuote } from "@/app/lib/utils";
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
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function AddQuote() {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [isLoading, setIsLoading] = useState(false)
    const [value, setValue] = useState('')
    const { data: session } = useSession();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const res = await createQuote(value, session?.user?.id as string);
            if (!res.ok) throw res.error


            addToast({
                color: 'success',
                title: "Quote Created.",
            });

            setIsLoading(false);
            window.location.reload()
            onClose()
        } catch (error) {
            onClose()
            setIsLoading(false);
            console.log(error);

            addToast({
                color: 'danger',
                title: "Failed to Create Quote",
                description: "Something went wrong.",
                promise: new Promise((resolve) => setTimeout(resolve, 3000)), // Still use a promise to show progress
            });
        }
    };

    return (
        <>
            <Tooltip content="Create New Quote!">
                <Button radius="full" className="p-[38px_27px] fixed bottom-10 right-5 bg-blue-600" onPress={onOpen}>
                    <Plus />
                </Button>
            </Tooltip>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <form onSubmit={(e) => onSubmit(e)} className="f">
                            <ModalHeader className="flex flex-col font-medium">Add you Quote</ModalHeader>
                            <ModalBody>
                                <Textarea
                                    autoFocus
                                    classNames={{ input: ["text-xl font-thin"] }}
                                    value={value} onValueChange={setValue} />
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
                                    Create
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";

export default function ConcSetting({ setConc,onClose }) {

    return (
        <>
            <ModalHeader className="flex flex-col gap-1">Concentrations Setting</ModalHeader>
            <ModalBody>
                Coming soon.
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Cancel
                </Button>
                <Button color="primary" onPress={onClose}>
                    Save
                </Button>
            </ModalFooter>
        </>

    );
}



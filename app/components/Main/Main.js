"use client";

import { Button } from "@nextui-org/react";
import { Modal, useDisclosure } from "@nextui-org/modal";

export default function Main() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClickMask = () => {
    onOpenChange(false);
  };

  return (
    <>
      <Button
        color="primary"
        onPress={onOpen}
        className="fixed bottom-10 left-1/2 -translate-x-1/2"
      >
        Start free trial
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <div
          className="absolute left-0 top-0 w-full h-full bg-[rgba(0,0,0,.2)] flex justify-center items-center"
          onClick={handleClickMask}
        >
          <div
            className="w-[500px] h-[400px] bg-[rgba(255,255,255,0.3)] backdrop-blur rounded-xl"
            onClick={(e) => e.stopPropagation()}
          ></div>
        </div>
      </Modal>
    </>
  );
}

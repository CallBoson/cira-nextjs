"use client";

import { Modal } from "@nextui-org/modal";
import { motion, AnimatePresence } from "framer-motion";
import { MagicCard } from "./MagicCard";
import { Button } from "@nextui-org/react";
import { BsStars } from "react-icons/bs";
import ModalContent from "./ModalContent/ModalContent";
import { useModalStore } from "./zustand/useModal";

export default function Main() {
  const { isOpen, onOpen, onClose } = useModalStore();

  const handleClickMask = () => {
    onClose();
  };

  return (
    <>
      <div className="fixed bottom-14 left-1/2 -translate-x-1/2">
        <Button
          onPress={onOpen}
          startContent={<BsStars className="text-2xl" />}
          size="lg"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-lg rounded-full"
        >
          Get Touch
        </Button>
      </div>

      <AnimatePresence>
        <Modal isOpen={isOpen}>
          <div
            className="fixed left-0 top-0 w-full h-full bg-[rgba(0,0,0,.2)] flex justify-center items-center z-20"
            onClick={handleClickMask}
          >
            <motion.div
              className=" bg-[rgb(13,13,13)] backdrop-blur-xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0, y: 200 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 100 },
              }}
              exit={{
                scale: 0.5,
                opacity: 0,
                y: 200,
                transition: { duration: 0.3 },
              }}
            >
              <MagicCard
                gradientColor="#262626"
                className="border border-[rgba(255,255,255,.1)]"
              >
                <div className="relative lg:w-[800px] w-[90vw] h-[600px]">
                  <img
                    src="https://web.clay.earth/assets/gradient_bg-6c96905f.png"
                    className="absolute inset-0 left-0 top-1/2 -translate-y-1/2 w-full h-full blur-md saturate-150 opacity-[.65] z-[-1]"
                  />
                  <ModalContent />
                </div>
              </MagicCard>
            </motion.div>
          </div>
        </Modal>
      </AnimatePresence>
    </>
  );
}

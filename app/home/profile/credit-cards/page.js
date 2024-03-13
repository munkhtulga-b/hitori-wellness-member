"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { nullSafety } from "@/app/_utils/helpers";
import { motion, AnimatePresence } from "framer-motion";

const CreditCards = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState({
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    setIsLoading((prev) => ({ ...prev, isFetching: true }));
    setCards([
      {
        id: 1,
        cardHolderName: "Test Holder 1",
        cardNumber: "3456",
        expiry: "12/24",
        cvv: "123",
      },
      // {
      //   id: 2,
      //   cardHolderName: "Test Holder 2",
      //   cardNumber: "3078",
      //   expiry: "01/26",
      //   cvv: "999",
      // },
    ]);
    setIsLoading((prev) => ({ ...prev, isFetching: false }));
  };

  const updateCard = async () => {
    setIsLoading((prev) => ({ ...prev, isUpdating: true }));
    console.log("updating");
    setIsLoading((prev) => ({ ...prev, isUpdating: false }));
  };

  const deleteCard = async () => {
    setIsLoading((prev) => ({ ...prev, isDeleting: true }));
    console.log("deleting");
    setIsLoading((prev) => ({ ...prev, isDeleting: false }));
  };

  const CardTemplate = ({ card, idx }) => {
    const onSelect = () => {
      if (!selectedCard) {
        setSelectedCard(card);
      }
    };

    return (
      <>
        <section className="tw-relative" onClick={() => onSelect()}>
          <Image
            priority
            src={`/assets/profile/credit-cards/card-template-${
              idx && idx === 1 ? "blue" : "indigo"
            }.svg`}
            alt="card-template"
            width={0}
            height={0}
            style={{ width: "100%", height: "auto", zIndex: 0 }}
          />
          <div className="tw-absolute tw-top-[32px] tw-left-[24px] tw-bottom-[32px] tw-right-[24px]">
            <div className="tw-flex tw-flex-col tw-h-full">
              <section className="tw-flex tw-justify-between tw-items-start">
                <Image
                  src="/assets/profile/credit-cards/card-chip.svg"
                  alt="visa"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
                <Image
                  src="/assets/profile/credit-cards/card-visa.svg"
                  alt="visa"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              </section>
              <section className="tw-grow tw-mt-[30px] tw-flex tw-flex-col tw-justify-between">
                <div>
                  <span className="tw-text-white tw-text-lg tw-tracking-[2px]">
                    **** **** **** {nullSafety(card.cardNumber)}
                  </span>
                </div>
                <div className="tw-flex tw-justify-between">
                  <ul>
                    <li className="tw-text-white tw-text-sm tw-tracking-[0.12px]">
                      Card Holder Name
                    </li>
                    <li className="tw-text-white tw-text-xl">
                      {nullSafety(card.cardHolderName)}
                    </li>
                  </ul>
                  <ul>
                    <li className="tw-text-white tw-text-sm tw-tracking-[0.12px]">
                      Expiry Date
                    </li>
                    <li className="tw-text-white tw-text-xl">
                      {nullSafety(card.expiry)}
                    </li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </section>
      </>
    );
  };

  const AddCard = () => {
    return (
      <div
        onClick={() => router.push("/home/profile/credit-cards/add")}
        className="tw-h-[184px] tw-w-full tw-rounded-xl tw-shadow tw-bg-white tw-grid tw-place-items-center"
      >
        <div className="tw-flex tw-flex-col tw-gap-1 tw-items-center">
          <Image
            src="/assets/profile/credit-cards/add-card-icon.svg"
            alt="add-card"
            width={0}
            height={0}
            style={{ height: "auto", width: "auto" }}
          />
          <span className="tw-text-lg">カードを追加する</span>
          <p className="tw-text-sm tw-tracking-[0.12px]">
            ここを押してカードの追加が可能です
          </p>
        </div>
      </div>
    );
  };

  const SelectedCardComponent = () => {
    return (
      <>
        <motion.div
          key={`selected-card-view`}
          variants={motionVariants}
          initial="initial"
          animate="visible"
          exit="exit"
          className="tw-flex tw-flex-col tw-gap-6"
        >
          <CardTemplate card={selectedCard} />
          <section className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                名義人
              </span>
              <span className="tw-text-sm tw-text-secondary tw-tracking-[0.12px]">
                Z.Solongo
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                利用期限
              </span>
              <span className="tw-text-sm tw-text-secondary tw-tracking-[0.12px]">
                02/30
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                カード番号
              </span>
              <span className="tw-text-sm tw-text-secondary tw-tracking-[0.12px]">
                **** **** **** 2345
              </span>
            </div>
            <div
              className={`${
                isLoading.isUpdating
                  ? "tw-bg-gray-100 tw-animate-pulse"
                  : "tw-bg-white"
              } tw-flex tw-justify-between tw-items-center tw-gap-4 tw-p-4 tw-rounded-xl tw-shadow`}
              onClick={() => updateCard()}
            >
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                主要カードに設定する
              </span>
              {isLoading.isUpdating ? (
                <Spin
                  indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />}
                />
              ) : (
                <Image
                  src="/assets/profile/arrow-right.svg"
                  alt="arrow-right"
                  width={0}
                  height={0}
                  style={{ height: "auto", width: "auto" }}
                />
              )}
            </div>
            <div className="tw-flex tw-justify-between">
              <Button
                size="large"
                className="tw-w-[80px]"
                onClick={() => setSelectedCard(null)}
              >
                戻る
              </Button>
              <Button
                loading={isLoading.isDeleting}
                size="large"
                className="tw-w-[80px]"
                onClick={() => deleteCard()}
              >
                削除
              </Button>
            </div>
          </section>
        </motion.div>
      </>
    );
  };

  const motionVariants = {
    initial: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">
            保存しているクレジットカード
          </span>
        </section>

        {!isLoading.isFetching ? (
          <section className="tw-flex tw-flex-col tw-gap-2">
            <span className="tw-leading-[22px] tw-tracking-[0.14px]">
              クレジットカード
            </span>
            <AnimatePresence mode="wait">
              {!selectedCard ? (
                <motion.div
                  key={`cards-view`}
                  variants={motionVariants}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                  className="tw-flex tw-flex-col tw-gap-4"
                >
                  {cards?.length ? (
                    <>
                      {cards.map((card, idx) => {
                        return (
                          <CardTemplate key={card.id} card={card} idx={idx} />
                        );
                      })}
                    </>
                  ) : null}
                  {cards?.length < 2 ? <AddCard /> : null}
                </motion.div>
              ) : (
                <SelectedCardComponent />
              )}
            </AnimatePresence>
          </section>
        ) : (
          <>Loader</>
        )}
      </div>
    </>
  );
};

export default CreditCards;

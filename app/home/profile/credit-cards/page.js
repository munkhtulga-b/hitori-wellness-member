"use client";

import $api from "@/app/_api/index";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { nullSafety } from "@/app/_utils/helpers";
import { motion, AnimatePresence } from "framer-motion";
import FullScreenLoading from "@/app/_components/animation/FullScreenLoading";

const CreditCards = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
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
    const { isOk, data } = await $api.member.card.getMany();
    if (isOk) {
      setCards(data);
    }
    setIsLoading((prev) => ({ ...prev, isFetching: false }));
  };

  const updateCard = async () => {
    setIsLoading({ isUpdating: true });
    const { isOk } = await $api.member.card.update(selectedCard.id, {
      is_default: true,
    });
    if (isOk) {
      await fetchCards();
      setSelectedCard(null);
      messageApi.success("Card updated");
    }
    setIsLoading({ isUpdating: false });
  };

  const deleteCard = async () => {
    setIsLoading((prev) => ({ ...prev, isDeleting: true }));
    const { isOk } = await $api.member.card.remove(selectedCard.id);
    if (isOk) {
      await fetchCards();
      setSelectedCard(null);
      messageApi.success("Card deleted");
    }
    setIsLoading((prev) => ({ ...prev, isDeleting: false }));
  };

  const CardTemplate = ({ card }) => {
    const onSelect = () => {
      if (!selectedCard) {
        setSelectedCard(card);
      }
    };

    const getCardIcon = () => {
      const brands = [
        {
          name: "visa",
          icon: "/assets/profile/credit-cards/card-visa.svg",
        },
        {
          name: "master card",
          icon: "/assets/profile/credit-cards/card-master.svg",
        },
        {
          name: "american express",
          icon: "/assets/profile/credit-cards/card-american-express.svg",
        },
        {
          name: "diners club",
          icon: "/assets/profile/credit-cards/card-diners.svg",
        },
        {
          name: "jcb",
          icon: "/assets/profile/credit-cards/card-jcb.svg",
        },
        {
          name: "discover",
          icon: "/assets/profile/credit-cards/card-discover.svg",
        },
      ];

      const matched = brands.find((brand) => {
        return (
          brand.name.toLowerCase().replace(/\s/g, "") ===
          nullSafety(card.brand).toLowerCase().replace(/\s/g, "")
        );
      });

      return matched ? matched.icon : brands[0].icon;
    };

    return (
      <>
        <section className="tw-relative" onClick={() => onSelect()}>
          <Image
            priority
            src={`/assets/profile/credit-cards/card-template-${
              card.is_default ? "indigo" : "blue"
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
                  src={getCardIcon()}
                  alt="visa"
                  width={0}
                  height={0}
                  style={{ width: "auto", height: "auto" }}
                />
              </section>
              <section className="tw-grow tw-mt-[30px] tw-flex tw-flex-col tw-justify-between">
                <div>
                  <span className="tw-text-white tw-text-lg tw-tracking-[2px]">
                    **** **** **** {nullSafety(card.card_last4)}
                  </span>
                </div>
                <div className="tw-flex tw-justify-between">
                  <ul>
                    <li className="tw-text-white tw-text-sm tw-tracking-[0.12px]">
                      Card Holder Name
                    </li>
                    <li className="tw-text-white tw-text-xl">
                      {nullSafety(card.card_name)}
                    </li>
                  </ul>
                  <ul>
                    <li className="tw-text-white tw-text-sm tw-tracking-[0.12px]">
                      Expiry Date
                    </li>
                    <li className="tw-text-white tw-text-xl">
                      {`${nullSafety(card.expire_month)}/${nullSafety(
                        card.expire_year.toString().slice(-2)
                      )}`}
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
        <div className="tw-flex tw-flex-col tw-gap-6">
          <CardTemplate card={selectedCard} />
          <section className="tw-flex tw-flex-col tw-gap-4">
            <div className="tw-flex tw-flex-col tw-gap-1">
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                名義人
              </span>
              <span className="tw-text-sm tw-text-secondary tw-tracking-[0.12px]">
                {nullSafety(selectedCard.card_name)}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                利用期限
              </span>
              <span className="tw-text-sm tw-text-secondary tw-tracking-[0.12px]">
                {`${nullSafety(selectedCard.expire_month)}/${nullSafety(
                  selectedCard.expire_year.toString().slice(-2)
                )}`}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                カード番号
              </span>
              <span className="tw-text-sm tw-text-secondary tw-tracking-[0.12px]">
                **** **** **** {nullSafety(selectedCard.card_last4)}
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
        </div>
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
      {contextHolder}
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
                      {cards.map((card) => {
                        return <CardTemplate key={card.id} card={card} />;
                      })}
                    </>
                  ) : null}
                  {cards?.length < 2 ? <AddCard /> : null}
                </motion.div>
              ) : (
                <motion.div
                  key={`selected-card-view`}
                  variants={motionVariants}
                  initial="initial"
                  animate="visible"
                  exit="exit"
                >
                  <SelectedCardComponent />
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        ) : (
          <FullScreenLoading isLoading={isLoading.isFetching} />
        )}
      </div>
    </>
  );
};

export default CreditCards;

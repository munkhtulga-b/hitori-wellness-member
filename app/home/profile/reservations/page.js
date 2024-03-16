"use client";

import { useState } from "react";
import { Button } from "antd";
import Image from "next/image";

const filters = [
  {
    id: null,
    text: "予約中",
    dataIndex: "",
  },
  {
    id: 2,
    text: "過去",
    dataIndex: "",
  },
  {
    id: 3,
    text: "キャンセル",
    dataIndex: "",
  },
];

const ReservationHistory = () => {
  const [activeFilterId, setActiveFilterId] = useState(null);

  const ReservationCard = () => {
    return (
      <>
        {activeFilterId === 3 ? (
          <section className="tw-absolute tw-top-4 tw--right-4 tw-rotate-[38deg]">
            <span className="tw-text-sm tw-leading-6 tw-tracking-[0.12px] tw-py-[2px] tw-px-2 tw-rounded-full tw-shadow">
              キャンセル済み
            </span>
          </section>
        ) : null}
        <section className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src={`/assets/confirm/time-blue.svg`}
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-grow tw-text-lg">日付時刻</span>
          </div>
          <span className="tw-text-secondary tw-leading-[22px] tw-tracking-[0.14px]">
            2024/01/03(土) 07:00-07:30
          </span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src={`/assets/confirm/location-blue.svg`}
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-grow tw-text-lg">日付時刻</span>
          </div>
          <span className="tw-leading-[22px] tw-tracking-[0.14px]">
            KARADA BESTA Ginza store
          </span>
          <span className="tw-text-secondary tw-text-sm tw-tracking-[0.12px]">
            104-0061 東京都中央区築地1-10-11 RATIO広路701
          </span>
        </section>
        <section className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src={`/assets/confirm/program-blue.svg`}
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-grow tw-text-lg">プログラム</span>
          </div>
          <span className="tw-leading-[22px] tw-tracking-[0.14px]">
            30分【会員様向け】パーソナルトレーニング予約メニュー
          </span>
          <span className="tw-text-secondary tw-text-sm tw-tracking-[0.12px]">
            パーソナルトレーニング(30分)＋セルフエステor有酸素マシン(30分）
            合計60分間
          </span>
        </section>
        {/* <section className="tw-flex tw-flex-col tw-gap-2">
          <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
            <Image
              src={`/assets/confirm/coach-blue.svg`}
              alt="time"
              width={0}
              height={0}
              style={{ width: "auto", height: "auto" }}
            />
            <span className="tw-grow tw-text-lg">プログラム</span>
          </div>
          <div className="tw-flex tw-justify-start tw-items-start tw-gap-3">
            <section className="tw-bg-gray-200 tw-rounded-full tw-w-[60px] tw-h-[60px]"></section>
            <section>
              <span className="tw-leading-[22px] tw-tracking-[0.14px]">
                齋藤航平
              </span>
            </section>
          </div>
        </section> */}
      </>
    );
  };

  const onFilterChange = (id) => {
    if (id === activeFilterId) return setActiveFilterId(null);
    setActiveFilterId(id);
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4">
        <section>
          <span className="tw-text-xxl tw-font-medium">予約履歴</span>
        </section>
        <section className="tw-flex tw-flex-wrap tw-justify-start tw-items-center tw-gap-2">
          {filters.map((filter) => {
            return (
              <Button
                key={filter.text}
                onClick={() => onFilterChange(filter.id)}
                style={{
                  borderColor: activeFilterId === filter.id && "#B7DDFF",
                  color: activeFilterId === filter.id && "#1890FF",
                }}
              >
                <div className="tw-flex tw-justify-start tw-items-center tw-gap-2">
                  <span>{filter.text}</span>
                  {activeFilterId && activeFilterId === filter.id ? (
                    <Image
                      src="/assets/branch/close-icon-blue.svg"
                      alt="remove"
                      width={0}
                      height={0}
                      style={{ width: "auto", height: "auto" }}
                    />
                  ) : null}
                </div>
              </Button>
            );
          })}
        </section>

        <section className="tw-p-4 tw-rounded-xl tw-bg-white tw-shadow">
          <div className="tw-flex tw-flex-col tw-gap-4 tw-relative">
            <ReservationCard />

            {activeFilterId === null ? (
              <>
                <section className="tw-p-2 tw-rounded-xl tw-border-2 tw-border-info">
                  <p className="tw-leading-[22px] tw-tracking-[0.14px]">
                    2024 年 1 月 7 日 00:00
                    以降にキャンセルまたはスケジュールを変更した場合、払い戻しは行われません。
                  </p>
                </section>

                <section className="tw-flex tw-justify-end tw-gap-2">
                  <Button size="large" className="tw-w-[128px]">
                    キャンセル
                  </Button>
                  <Button type="primary" size="large" className="tw-w-[128px]">
                    編集
                  </Button>
                </section>
              </>
            ) : null}
          </div>
        </section>
      </div>
    </>
  );
};

export default ReservationHistory;

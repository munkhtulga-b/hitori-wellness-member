"use client";

import $api from "@/app/_api";
import { useEffect, useState } from "react";

// import Image from "next/image";
import QRCode from "react-qr-code";

const UserMemberId = () => {
  const [qrCode, setQrCode] = useState(null);
  const [warningDesc, setWarningDesc] = useState(null);

  useEffect(() => {
    fetchQrCode();
  }, []);

  const fetchQrCode = async () => {
    const { isOk, data } = await $api.member.remoteLock.getQR();
    if (isOk) {
      setQrCode(data?.booking?.universal_access_key_url || null);
      setWarningDesc(data?.m_studio?.warning_desc || null);
    }
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-h-full tw-relative">
        <section>
          <span className="tw-text-xxl tw-font-medium">会員ID</span>
        </section>
        <section className="tw-absolute tw-top-1/2 tw-left-1/2 tw-translate-x-[-50%] tw-translate-y-[-50%] tw-w-full">
          {qrCode !== null ? (
            <div className="tw-flex tw-flex-col tw-gap-6 tw-items-center">
              <section className="tw-size-[220px]">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={qrCode}
                  viewBox={`0 0 256 256`}
                />
                {/* <Image
                src={`data:image/png;base64,${base64string}`}
                alt="qr-code"
                width={250}
                height={250}
              /> */}
              </section>
              {warningDesc ? (
                <section className="tw-px-8">
                  <p
                    dangerouslySetInnerHTML={{ __html: warningDesc }}
                    className="tw-leading-[22px] tw-tracking-[0.14px]"
                  ></p>
                </section>
              ) : null}
            </div>
          ) : (
            <section className="tw-px-8 tw-w-full">
              <p className="tw-leading-[22px] tw-tracking-[0.14px]">
                QRコード・ピンコードは予約が発生した場合のみ開始時間の10分前から表示されます。
              </p>
            </section>
          )}
        </section>
      </div>
    </>
  );
};

export default UserMemberId;

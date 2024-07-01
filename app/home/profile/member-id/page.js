"use client";

import $api from "@/app/_api";
import { useEffect, useState } from "react";

// import Image from "next/image";
import QRCode from "react-qr-code";

const UserMemberId = () => {
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    fetchQrCode();
  }, []);

  const fetchQrCode = async () => {
    const { isOk, data } = await $api.member.remoteLock.getQR();
    if (isOk) {
      setQrCode(data?.booking?.universal_access_key_url || null);
    }
  };

  return (
    <>
      <div className="tw-flex tw-flex-col tw-gap-4 tw-h-full tw-relative">
        <section>
          <span className="tw-text-xxl tw-font-medium">会員ID</span>
        </section>
        <section className="tw-absolute tw-top-1/2 tw-translate-y-[-50%]">
          <div className="tw-flex tw-flex-col tw-gap-6 tw-items-center">
            <section className="tw-size-[220px]">
              {qrCode !== null && (
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={qrCode}
                  viewBox={`0 0 256 256`}
                />
              )}
              {/* <Image
                src={`data:image/png;base64,${base64string}`}
                alt="qr-code"
                width={250}
                height={250}
              /> */}
            </section>
            <section className="tw-px-8">
              <p>
                入店の際にはこの会員QRコードを店舗端末にかざしてください。またはピンコードの入力で入店も可能です。
              </p>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserMemberId;
